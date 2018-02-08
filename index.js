const dateFormat = require('dateformat');
const promise = require('bluebird');
const puppeteer = require('puppeteer');

const credentials = require('./credentials');
const elements = require('./elements');
const urls = require('./urls');

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(urls.login);
  await signIn(page);
  await getTransactions(page);
}

async function signIn(page) {
  await sleep(5000);
  await page.click(elements.username);
  await page.keyboard.type(credentials.username);
  await page.click(elements.password);
  await page.keyboard.type(credentials.password);
  await page.click(elements.login);
  await sleep(5000);
}

async function getTransactions(page) {
  await page.goto(urls.transactions + getDateParameter());
}

function sleep(ms) {
  return new promise(resolve => setTimeout(resolve, ms));
}

function getDateParameter() {
  // const format = 'mm/dd/yyyy';
  // const date = new Date();
  // const startDate = dateFormat(new Date(date.getFullYear(), date.getMonth(), 1), format);
  // const endDate = dateFormat(new Date(date.getFullYear(), date.getMonth() + 1, 0), format);
  //
  // return '?startDate=' + startDate + '&endDate=' + endDate;
  return '?startDate=01/01/2018&endDate=01/31/2018';
}

run();
