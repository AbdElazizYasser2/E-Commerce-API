import Order from '../models/Order.js';
import Factory from '../utils/handlersFactory.js';

/**
 * @desc    Create new Order
 * @route   POST /api/v1/orders
 * @access  Private/User
 */
export const createOrder = Factory.createOne(Order);

/**
 * @desc    Get list of orders
 * @route   GET /api/v1/orders
 * @access  Private/Admin
 */
export const getOrders = Factory.getAll(Order);

/**
 * @desc    Get specific order by id
 * @route   GET /api/v1/orders/:orderId
 * @access  Private/User
 */
export const getOrder = Factory.getOne(Order);

/**
 * @desc    Update specific order by id
 * @route   PUT /api/v1/orders/:orderId
 * @access  Private/Admin
 */
export const updateOrder = Factory.updateOne(Order);

/**
 * @desc    Delete specific order by id
 * @route   DELETE /api/v1/orders/:orderId
 * @access  Private/Admin
 */
export const deleteOrder = Factory.deleteOne(Order);