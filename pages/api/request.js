const cheerio = require('cheerio');
const {SELECTOR_JS} = require("@/const/snippets");

const PROXY_API_KEY = process.env.PROXY_API_KEY;

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function isValidHttpUrl(string) {
    console.log(`validating ${string}`)
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

async function sendAnalytics(req){
    let body = req.body;
    
    body["referrer"] = req.headers["referer"]
    const config = {
        headers: {
            "User-Agent": req.headers["user-agent"],
            "X-Forwarded-For" : req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"] : "",
        },
        body: JSON.stringify({
            "name": "pageview",
            "url": process.env.NEXT_PUBLIC_URL,
            "domain": `${process.env.NEXT_PUBLIC_DOMAIN}`,
            "props": {
                "body": body
            }
        }),
        "method": "post"
    }
    let resp = await fetch(`${process.env.ANALYTICS_ENDPOINT}/api/event`, config);
    console.log(`Response status for analytics ${resp.status}`)
}

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const body = req.body;
        console.log(`got post request with body ${JSON.stringify(body)}`)

        let resp = null;
        
        if (isValidHttpUrl(body.url) === false){
            resp = {"error" :"invalid url in body"}
            res.status(400).json(resp)
        }
        // This is where the proxy request is used
        else if (process.env.PROXY_ENDPOINT){
            const payload = body;

            payload["user-agent"] = USER_AGENT;
            payload["method"] = "GET";
            payload["render_js"] = body.render_js ? true : false;

            const config = {
                "body": JSON.stringify(payload),
                "headers": {
                    "apikey": PROXY_API_KEY,
                    "content-type": "application/json"
                },
                "method": "post"
            }

            // analytics to prevent abuse
            await sendAnalytics(req);

            resp = await fetch(`${process.env.PROXY_ENDPOINT}/v1/request`, config);
        } else {
            // without proxy
            const config = {
                "headers": {
                    "user-agent": "application/json"
                },
                "method": "get"
            }
            resp = await fetch(body.url, config);
        }

        const html = await resp.text();

        console.log(`html before: ${html.length}`)
        // add in the query selector
        const $ = cheerio.load(html);
        // console.log(`appending selector js :${SELECTOR_JS}`)
        $('head').prepend(SELECTOR_JS)

        console.log(`sending back html ${$.html().length}`)

        res.status(200).send($.html());
    } else {
        console.log(`got another request type: ${req.method}`)
        // Handle any other HTTP method
        res.status(200).json({ message: 'Hello from Next.js!' })
    }
}