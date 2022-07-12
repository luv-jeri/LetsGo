const _Error = require('../utils/_Error');
const catchAsync = require('../utils/catch_async');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports.authenticate = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new _Error('Please provide a authorization header with token', 400));
  }

  const decoded = await promisify(jwt.verify)(authorization, 'eyetheme');

  __(decoded);

  req.user = decoded;

  next();
});
