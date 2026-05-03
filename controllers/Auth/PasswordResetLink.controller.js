import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

/**
 * @desc    Forgot password - Send reset code
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError(`No user found with email: ${req.body.email}`, 404));
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');

  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  user.passwordResetVerified = false;
  await user.save({ validateBeforeSave: false });

  console.log(`Reset code: ${resetCode}`);

  res.status(200).json({
    message: 'Reset code sent to email',
  });
});

/**
 * @desc    Verify reset code
 * @route   POST /api/v1/auth/verify-reset-code
 * @access  Public
 */
export const verifyResetCode = asyncHandler(async (req, res, next) => {
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode)
    .digest('hex');

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError('Invalid or expired reset code', 400));
  }

  user.passwordResetVerified = true;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    message: 'Reset code verified successfully',
  });
});

/**
 * @desc    Reset password
 * @route   PUT /api/v1/auth/reset-password
 * @access  Public
 */
export const resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError(`No user found with email: ${req.body.email}`, 404));
  }

  if (!user.passwordResetVerified) {
    return next(new ApiError('Reset code not verified', 400));
  }

  user.password = req.body.password;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    message: 'Password reset successfully',
    token,
  });
});