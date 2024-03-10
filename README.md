# Picker

An low-code application for testing and experimenting with css selectors. A basic developer console with a built-in HTML parser and proxy.

> **Warning**
> This app is a work in progress. I'm building this in public. You can follow the progress on Twitter [@LinkScrape](https://twitter.com/LinkScrape). 
> See the roadmap below.

## About this project

This project as an experiment to see to speed up testing and parsing data from websites.

## Demo

![demo of how to scrape data from ebay](images/demo.gif)

You can also try out the tool at [tools.link.sc](https://tools.link.sc)

## Note on Performance

> **Warning**
> This app is using the unstable and not production ready.
> **Expect some weird UI glitches when **.
> If you see something broken, you can ping me [@LinkScrape](https://twitter.com/LinkScrape).


## Features

- Low code
- AI Assisted Parsing
- Built-in browser
- Website fetch
- CSS selector/highlighter
- HTML Parser
- Built in proxy
- Data extractor
- Great for web scraping

## Roadmap

- [x] Create sudo browser
- [x] Proxy requests
- [x] Renders Javascript
- [x] Inject CSS selector tool
- [x] Pink a click css selector
- [x] HTML Parser
- [x] Extra data to tables
- [x] Dark mode
- [x] Javascript Toggle
- [x] Added ChatGPT
- [ ] Automatically Generate code
- [ ] Build a better UI

## Known Issues

A list of things not working right now:

1. UI is very basic
2. Might not work for all websites
3. CSS Selector tool is not perfect
4. Difficult to extract link
5. Javascript rendering does not always work

## AI Assisted Parsing

ChatGPT is great at extract and grabbing data. However it has a token size limit (8192). So to help break down the token size. You can select specific elements to pass into the prompt. Using CSS Selector to grab a small subset of elements to parse, allowing ChatGPT to extract data from websites.

## Running Locally

1. Install dependencies using pnpm:

```sh
npm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
npm dev
```

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=getlinksc/css-selector-tool&type=Date)](https://star-history.com/#getlinksc/css-selector-tool&Date)