// Tax calculator logic. Works in the browser and in Node.js (for Jasmine tests).
// SAMPLE progressive slabs (annual income). Change them if your course gives different rules.
(function (root) {
  'use strict';

  var BRACKETS = [
    { upTo: 600000, rate: 0.0 },
    { upTo: 1200000, rate: 0.01 },
    { upTo: 2200000, rate: 0.11 },
    { upTo: 3200000, rate: 0.23 },
    { upTo: 4100000, rate: 0.30 },
    { upTo: Infinity, rate: 0.35 }
  ];

  function calculateTax(income) {
    if (typeof income !== 'number' || isNaN(income)) {
      throw new Error('Income must be a number');
    }
    if (income < 0) {
      throw new Error('Income cannot be negative');
    }
    var tax = 0;
    var lower = 0;
    for (var i = 0; i < BRACKETS.length; i++) {
      var upTo = BRACKETS[i].upTo;
      var rate = BRACKETS[i].rate;
      if (income > lower) {
        tax += (Math.min(income, upTo) - lower) * rate;
      }
      lower = upTo;
    }
    return Math.round(tax * 100) / 100;
  }

  function calculateSummary(income) {
    var tax = calculateTax(income);
    return {
      income: income,
      tax: tax,
      netIncome: Math.round((income - tax) * 100) / 100,
      effectiveRate: income === 0 ? 0 : Math.round((tax / income) * 10000) / 100
    };
  }

  var api = { calculateTax: calculateTax, calculateSummary: calculateSummary, BRACKETS: BRACKETS };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    root.TaxCalculator = api;
  }
})(this);
