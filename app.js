const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/tours', require('./routes/tours.routes'));

// # Global Error Handling Middleware
app.use((err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  const status = err.status || 'error';

  res.status(errStatus).json({ message, status });
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Not found',
  });
});

module.exports = app;
