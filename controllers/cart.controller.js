import Cart from '../models/Cart.js';
import Factory from '../utils/handlersFactory.js';

/**
 * @desc    Get list of carts
 * @route   GET /api/v1/carts
 * @access  Private/Admin
 */
export const getCarts = Factory.getAll(Cart);

/**
 * @desc    Get specific cart by id
 * @route   GET /api/v1/carts/:cartId
 * @access  Private/User
 */
export const getCart = Factory.getOne(Cart);

/**
 * @desc    Delete specific cart by id
 * @route   DELETE /api/v1/carts/:cartId
 * @access  Private/User
 */
export const deleteCart = Factory.deleteOne(Cart);