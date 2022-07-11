const User = require('../database/Schema/user.schema');
const _Error = require('../utils/_Error');
const catchAsync = require('../utils/catch_async');
const bcrypt = require('bcryptjs');

module.exports.singUp = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword, phone, photo } = req.body;

  //   if (password !== confirmPassword) {
  //     return next(new _Error('Passwords do not match 😁😁', 400));
  //   }

  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
    phone,
    photo,
  });

  res.status(200).json({
    status: 'success',
    message: 'User created successfully',
    data: newUser,
  });
});

module.exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new _Error('Please provide email and password', 400));
  }

  const user = await User.findOne({
    email,
  }).select('+password');

  if (!user) {
    return next(new _Error('Invalid email or password', 401));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new _Error('Invalid email or password', 401));
  }

  res.status(200).json({
    status: 'success',
    message: 'User logged in successfully',
    data: {
      email: user.email,
      name: user.name,
      phone: user.phone,
      photo: user.photo,
    },
  });
});
