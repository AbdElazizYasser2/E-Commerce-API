import Review from '../models/Review.js';
import Factory from '../utils/handlersFactory.js';

/**
 * @desc    Create new Review
 * @route   POST /api/v1/reviews
 * @access  Private/User
 */
export const createReview = Factory.createOne(Review);

/**
 * @desc    Get list of reviews
 * @route   GET /api/v1/reviews
 * @access  Public
 */
export const getReviews = Factory.getAll(Review);

/**
 * @desc    Get specific review by id
 * @route   GET /api/v1/reviews/:reviewId
 * @access  Public
 */
export const getReview = Factory.getOne(Review);

/**
 * @desc    Update specific review by id
 * @route   PUT /api/v1/reviews/:reviewId
 * @access  Private/User
 */
export const updateReview = Factory.updateOne(Review);

/**
 * @desc    Delete specific review by id
 * @route   DELETE /api/v1/reviews/:reviewId
 * @access  Private/User/Admin
 */
export const deleteReview = Factory.deleteOne(Review);