function fmt(n) {
  return Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 });
}

document.getElementById('calc').addEventListener('click', function () {
  var value = document.getElementById('income').value;
  var out = document.getElementById('result');

  if (value === '') {
    out.innerHTML = '<span class="error">Please enter your income.</span>';
    return;
  }

  try {
    var r = TaxCalculator.calculateSummary(Number(value));
    out.innerHTML =
      '<strong>Income:</strong> ' + fmt(r.income) + '<br>' +
      '<strong>Tax:</strong> ' + fmt(r.tax) + '<br>' +
      '<strong>Net income:</strong> ' + fmt(r.netIncome) + '<br>' +
      '<strong>Effective rate:</strong> ' + r.effectiveRate + '%';
  } catch (e) {
    out.innerHTML = '<span class="error">' + e.message + '</span>';
  }
});
