// Third party
const dateFormat = require("dateformat");
const promise = require("bluebird");

// Local
const credentials = require("./credentials");
const elements = require("./elements");
const urls = require("./urls");

async function signIn(page) {
  await page.goto(urls.login, { waitUntil: "networkidle0" });
  await page.click(elements.username);
  await page.keyboard.type(credentials.username);
  await page.click(elements.password);
  await page.keyboard.type(credentials.password);
  await page.click(elements.login);
  await sleep(5000);
}

async function scrapeTransactions(page) {
  await page.goto(urls.transactions + getDateParameter(), {
    waitUntil: "networkidle0"
  });
  return await page.evaluate(() => {
    let transactions = [];
    const elements = document.getElementsByClassName("firstdate");
    for (let i = 0; i < elements.length; i++) {
      if (!elements[i].className.contains("pending")) {
        let transactionObject = {};

        transactionObject.date = elements[i].getElementsByClassName(
          "date"
        )[0].innerText;
        transactionObject.description = elements[i].getElementsByClassName(
          "description"
        )[0].innerText;
        transactionObject.category = elements[i].getElementsByClassName(
          "cat"
        )[0].innerText;
        transactionObject.money = elements[i].getElementsByClassName(
          "money"
        )[0].innerText;

        transactions.push(transactionObject);
      }
    }

    return transactions;
  });
}

// Use sleep to wait for page to authenticate before we continue
function sleep(ms) {
  return new promise(resolve => setTimeout(resolve, ms));
}

// Url parameter to get transactions from the previous month or whatever hardcoded value is given
function getDateParameter() {
  const format = "mm/dd/yyyy";
  const date = new Date();
  const startDate = dateFormat(
    new Date(date.getFullYear(), date.getMonth() - 1, 1),
    format
  );
  const endDate = dateFormat(
    new Date(date.getFullYear(), date.getMonth(), 0),
    format
  );

  // return '?startDate=01/01/2016&endDate=02/28/2018';
  return "?startDate=" + startDate + "&endDate=" + endDate;
}

module.exports = {
  signIn: signIn,
  scrapeTransactions: scrapeTransactions
};
