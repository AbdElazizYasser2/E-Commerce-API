import ShippingMethod from '../models/ShippingMethod.js';
import Factory from '../utils/handlersFactory.js';

/**
 * @desc    Create new Shipping Method
 * @route   POST /api/v1/shipping-methods
 * @access  Private/Admin
 */
export const createShippingMethod = Factory.createOne(ShippingMethod);

/**
 * @desc    Get list of shipping methods
 * @route   GET /api/v1/shipping-methods
 * @access  Public
 */
export const getShippingMethods = Factory.getAll(ShippingMethod);

/**
 * @desc    Get specific shipping method by id
 * @route   GET /api/v1/shipping-methods/:shippingMethodId
 * @access  Public
 */
export const getShippingMethod = Factory.getOne(ShippingMethod);

/**
 * @desc    Update specific shipping method by id
 * @route   PUT /api/v1/shipping-methods/:shippingMethodId
 * @access  Private/Admin
 */
export const updateShippingMethod = Factory.updateOne(ShippingMethod);

/**
 * @desc    Delete specific shipping method by id
 * @route   DELETE /api/v1/shipping-methods/:shippingMethodId
 * @access  Private/Admin
 */
export const deleteShippingMethod = Factory.deleteOne(ShippingMethod);