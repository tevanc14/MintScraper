function aggregateTransactions(transactions) {
  const aggregation = {};
  const pattern = /^(Hide from Budget…|Transfer|Reimbursement|Credit Card Pay…)$/;

  transactions.forEach(transaction => {
    if (!transaction.category.match(pattern)) {
      if (!aggregation[transaction.category]) {
        aggregation[transaction.category] = getNumberFromMoneyString(transaction.money);
      } else {
        aggregation[transaction.category] += getNumberFromMoneyString(transaction.money);
      }
    }
  });

  return aggregation;
}

function getNumberFromMoneyString(moneyString) {
  const noDollarSigns = moneyString.replace('$', '');
  const replacedNegativeSign = noDollarSigns.replace('–', '-');
  return parseFloat(replacedNegativeSign.replace(',', ''));
}

function combineAggregations(aggregations) {
  let combined = {};

  aggregations.forEach(aggregation => {
    Object.keys(aggregation).forEach(key => {
      if (!combined[key]) {
        combined[key] = aggregation[key];
      } else {
        combined[key] += aggregation[key];
      }
    });
  });

  return combined;
}

module.exports = {
  aggregateTransactions: aggregateTransactions,
  combineAggregations: combineAggregations
};
