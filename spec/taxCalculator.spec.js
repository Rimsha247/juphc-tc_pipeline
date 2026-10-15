'use strict';
const { calculateTax, calculateSummary } = require('../src/taxCalculator');

describe('Tax Calculator', () => {
  it('returns 0 tax for income of 0', () => {
    expect(calculateTax(0)).toBe(0);
  });

  it('returns 0 tax inside the first (tax-free) slab', () => {
    expect(calculateTax(500000)).toBe(0);
    expect(calculateTax(600000)).toBe(0);
  });

  it('applies 1% in the second slab', () => {
    expect(calculateTax(1200000)).toBe(6000);
  });

  it('applies 11% in the third slab', () => {
    expect(calculateTax(2200000)).toBe(116000);
  });

  it('applies 23% in the fourth slab', () => {
    expect(calculateTax(3200000)).toBe(346000);
  });

  it('applies 30% in the fifth slab', () => {
    expect(calculateTax(4100000)).toBe(616000);
  });

  it('applies 35% above the last slab', () => {
    expect(calculateTax(5000000)).toBe(616000 + 900000 * 0.35);
  });

  it('throws for negative income', () => {
    expect(() => calculateTax(-1)).toThrowError('Income cannot be negative');
  });

  it('throws for non-number income', () => {
    expect(() => calculateTax('abc')).toThrowError('Income must be a number');
    expect(() => calculateTax(NaN)).toThrowError('Income must be a number');
  });

  it('builds a correct summary', () => {
    const s = calculateSummary(2200000);
    expect(s.tax).toBe(116000);
    expect(s.netIncome).toBe(2084000);
    expect(s.effectiveRate).toBe(5.27);
  });
});
