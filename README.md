# Mint Scraper

A Node.js project to read and aggregate information from Mint.

## Current Workflow

> - Open and sign into Mint
> - Read all transactions within a certain date range
> - Output transactions grouped by category

## Usage

> - Create file `mint/credentials.js`
>   - Export members inside of file as such:

```javascript
module.exports = {
  username: "xxxx",
  password: "xxxx"
};
```

> - Install requirements by executing `npm install`
> - Invoke scraper with `node index.js`
