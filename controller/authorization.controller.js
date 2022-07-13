const _Error = require('../utils/_Error');
const catchAsync = require('../utils/catch_async');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports.authenticate = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers || req.cookies;

  let token;

  if (authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  token = authorization;

  if (!token) {
    return next(new _Error('Please login to continue', 400));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decoded) {
    return next(new _Error('You are logged out.', 401));
  }

  req.user = decoded;

  next();
});
