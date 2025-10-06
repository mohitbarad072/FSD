const express = require('express');
const { body, validationResult } = require('express-validator');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Validation rules
const incomeValidation = [
  body('income1')
    .notEmpty()
    .withMessage('Income from source 1 is required')
    .isFloat({ min: 0 })
    .withMessage('Income from source 1 must be a positive number'),
  body('income2')
    .notEmpty()
    .withMessage('Income from source 2 is required')
    .isFloat({ min: 0 })
    .withMessage('Income from source 2 must be a positive number')
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    errors: null, 
    formData: null, 
    totalIncome: null 
  });
});

app.post('/calculate', incomeValidation, (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('index', {
      errors: errors.array(),
      formData: req.body,
      totalIncome: null
    });
  }

  // Server-side calculation (no client-side calculations)
  const income1 = parseFloat(req.body.income1);
  const income2 = parseFloat(req.body.income2);
  const totalIncome = income1 + income2;

  res.render('index', {
    errors: null,
    formData: req.body,
    totalIncome: totalIncome.toFixed(2)
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { 
    message: 'Page not found',
    error: {}
  });
});

app.listen(PORT, () => {
  console.log(`Tax form website running on http://localhost:${PORT}`);
});
