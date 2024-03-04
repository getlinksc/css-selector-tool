const cheerio = require('cheerio');
const {SELECTOR_JS} = require("@/const/snippets");

const PROXY_API_KEY = process.env.PROXY_API_KEY;

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

async function sendAnalytics(req){
    const config = {
        headers: req.headers,
        body: JSON.stringify({
            "name": "pageview",
            "url": process.env.NEXT_PUBLIC_URL,
            "domain": `${process.env.NEXT_PUBLIC_DOMAIN}`,
            "props": {
                "body": req.body
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

        // This is where the proxy request is used
        if (process.env.PROXY_ENDPOINT){
            const payload = body;

            payload["user-agent"] = USER_AGENT;
            payload["method"] = "GET";

            const config = {
                "body": JSON.stringify(payload),
                "headers": {
                    "apikey": PROXY_API_KEY,
                    "content-type": "application/json"
                },
                "method": "post"
            }

            const resp = await fetch(`${process.env.PROXY_ENDPOINT}/v1/request`, config);

            // analytics to prevent abuse
            await sendAnalytics(req);

            const html = await resp.text();
            const $ = cheerio.load(html);
            // console.log(`appending selector js :${SELECTOR_JS}`)
            $('head').prepend(SELECTOR_JS)
            console.log(`sending back html ${$.html().length}`)
            res.status(200).send($.html())
        } else {
            // make the request directly on server side
            res.status(200).json({ message: 'Hello from Next.js!' })
        }
    } else {
        console.log(`got another request type: ${req.method}`)
        // Handle any other HTTP method
        res.status(200).json({ message: 'Hello from Next.js!' })
    }
}