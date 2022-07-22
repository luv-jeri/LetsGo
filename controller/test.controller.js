const catchAsync = require('../utils/catch_async');
const _Error = require('../utils/_Error');

const User = require('../database/Schema/user.schema');

module.exports.test = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  await user.generateOTP();

  res.status(200).json({
    status: 'success',
  });
});
