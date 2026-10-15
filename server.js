'use strict';
const express = require('express');
const path = require('path');
const { calculateSummary } = require('./src/taxCalculator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => res.json({ status: 'UP' }));

app.get('/api/tax', (req, res) => {
  const income = Number(req.query.income);
  try {
    res.json(calculateSummary(income));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => console.log(`Tax Calculator running on port ${PORT}`));
}

module.exports = app;
