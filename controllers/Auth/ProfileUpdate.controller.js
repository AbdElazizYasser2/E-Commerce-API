import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

/**
 * @desc    Get my profile
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ data: user });
});

/**
 * @desc    Update my profile
 * @route   PUT /api/v1/auth/update-me
 * @access  Private
 */
export const updateMe = asyncHandler(async (req, res, next) => {
  if (req.body.password) {
    return next(new ApiError('This route is not for password updates, use /change-password', 400));
  }

  const allowedFields = ['first_name', 'last_name', 'email', 'phone', 'gender', 'birth_date', 'avatar'];
  const filteredBody = {};
  Object.keys(req.body).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredBody[key] = req.body[key];
    }
  });

  const user = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ data: user });
});

/**
 * @desc    Delete my account
 * @route   DELETE /api/v1/auth/delete-me
 * @access  Private
 */
export const deleteMe = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { is_delete: true, status: 'inactive' });
  res.status(204).send();
});