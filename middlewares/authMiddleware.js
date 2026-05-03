import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

// Protect Routes
export const protect = asyncHandler(async (req, res, next) => {
  // Check if token exists
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ApiError('You are not logged in, please login to get access', 401));
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new ApiError('User belonging to this token no longer exists', 401));
  }

  // Check if user changed password after token was issued
  if (currentUser.passwordChangedAt) {
    const changedTimestamp = parseInt(currentUser.passwordChangedAt.getTime() / 1000, 10);
    if (decoded.iat < changedTimestamp) {
      return next(new ApiError('User recently changed password, please login again', 401));
    }
  }

  // Check if user is active
  if (currentUser.status !== 'active') {
    return next(new ApiError('Your account is not active', 401));
  }

  req.user = currentUser;
  next();
});

// Restrict To Roles
export const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError('You do not have permission to perform this action', 403));
  }
  next();
};