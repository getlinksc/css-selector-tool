# Picker

An low-code application for testing and experimenting with css selectors. A basic developer console with a built-in HTML parser and proxy.

> **Warning**
> This app is a work in progress. I'm building this in public. You can follow the progress on Twitter [@LinkScrape](https://twitter.com/LinkScrape). 
> See the roadmap below.

## About this project

This project as an experiment to see to speed up testing and parsing data from websites.

## Note on Performance

> **Warning**
> This app is using the unstable and not production ready.
> **Expect some weird UI glitches when **.
> If you see something broken, you can ping me [@LinkScrape](https://twitter.com/LinkScrape).

## Features

- Low code
- Built-in browser
- Website fetch
- CSS selector/highlighter
- HTML Parser
- Built in proxy
- Data extractor
- Great for web scraping

## Roadmap

- [x] ~Create sudo browser~
- [x] ~Proxy requests~
- [x] ~Renders Javascript~
- [x] ~Inject CSS selector tool~
- [x] ~Pink a click css selector~
- [x] ~HTML Parser~
- [x] ~Extra data to tables~
- [x] Dark mode
- [ ] Automatically Generate code

## Known Issues

A list of things not working right now:

1. ~Basic UI~
2. ~Might not work for all websites~
3. ~CSS Selector tool is not perfect~
4. ~Difficult to extract link~

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