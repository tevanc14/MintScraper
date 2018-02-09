// Third party
const puppeteer = require('puppeteer');

// Local
const aggregator = require('./mint/aggregator');
const elements = require('./mint/elements');
const scraper = require('./mint/scraper');

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await scraper.signIn(page);

  let transactions;
  let aggregations = [];
  transactions = await scraper.scrapeTransactions(page);
  aggregations.push(aggregator.aggregateTransactions(transactions));
  while (transactions.length > 100) {
    transactions = await scraper.scrapeTransactions(page);
    aggregations.push(aggregator.aggregateTransactions(transactions));
    await page.click(elements.nextPage);
  }

  console.log(aggregator.combineAggregations(aggregations));
  browser.close();
}

run();
