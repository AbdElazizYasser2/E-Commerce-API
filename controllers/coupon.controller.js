import Coupon from '../models/Coupon.js';
import Factory from '../utils/handlersFactory.js';

/**
 * @desc    Create new Coupon
 * @route   POST /api/v1/coupons
 * @access  Private/Admin
 */
export const createCoupon = Factory.createOne(Coupon);

/**
 * @desc    Get list of coupons
 * @route   GET /api/v1/coupons
 * @access  Private/Admin
 */
export const getCoupons = Factory.getAll(Coupon);

/**
 * @desc    Get specific coupon by id
 * @route   GET /api/v1/coupons/:couponId
 * @access  Private/Admin
 */
export const getCoupon = Factory.getOne(Coupon);

/**
 * @desc    Update specific coupon by id
 * @route   PUT /api/v1/coupons/:couponId
 * @access  Private/Admin
 */
export const updateCoupon = Factory.updateOne(Coupon);

/**
 * @desc    Delete specific coupon by id
 * @route   DELETE /api/v1/coupons/:couponId
 * @access  Private/Admin
 */
export const deleteCoupon = Factory.deleteOne(Coupon);