'use strict';

// SAMPLE progressive tax slabs (annual income). Edit these to match your course/country rules.
// "upTo" is the top of each slice. Rate is applied only to the part of income inside that slice.
const BRACKETS = [
  { upTo: 600000, rate: 0.0 },
  { upTo: 1200000, rate: 0.01 },
  { upTo: 2200000, rate: 0.11 },
  { upTo: 3200000, rate: 0.23 },
  { upTo: 4100000, rate: 0.30 },
  { upTo: Infinity, rate: 0.35 }
];

function calculateTax(income) {
  if (typeof income !== 'number' || Number.isNaN(income)) {
    throw new Error('Income must be a number');
  }
  if (income < 0) {
    throw new Error('Income cannot be negative');
  }

  let tax = 0;
  let lower = 0;
  for (const { upTo, rate } of BRACKETS) {
    if (income > lower) {
      const taxable = Math.min(income, upTo) - lower;
      tax += taxable * rate;
    }
    lower = upTo;
  }
  return Math.round(tax * 100) / 100;
}

function calculateSummary(income) {
  const tax = calculateTax(income);
  const netIncome = Math.round((income - tax) * 100) / 100;
  const effectiveRate = income === 0 ? 0 : Math.round((tax / income) * 10000) / 100;
  return { income, tax, netIncome, effectiveRate };
}

module.exports = { calculateTax, calculateSummary, BRACKETS };
