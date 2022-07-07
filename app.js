const express = require('express');
const morgan = require('morgan');
// # Routes
const tourRoute = require('./routes/tours.routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/tours', tourRoute);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Not found',
  });
});

module.exports = app;
