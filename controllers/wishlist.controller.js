import Wishlist from '../models/Wishlist.js';
import Factory from '../utils/handlersFactory.js';

/**
 * @desc    Create new Wishlist
 * @route   POST /api/v1/wishlist
 * @access  Private/User
 */
export const createWishlist = Factory.createOne(Wishlist);

/**
 * @desc    Get list of wishlists
 * @route   GET /api/v1/wishlist
 * @access  Private/Admin
 */
export const getWishlists = Factory.getAll(Wishlist);

/**
 * @desc    Get specific wishlist by id
 * @route   GET /api/v1/wishlist/:wishlistId
 * @access  Private/User
 */
export const getWishlist = Factory.getOne(Wishlist);

/**
 * @desc    Update specific wishlist by id
 * @route   PUT /api/v1/wishlist/:wishlistId
 * @access  Private/User
 */
export const updateWishlist = Factory.updateOne(Wishlist);

/**
 * @desc    Delete specific wishlist by id
 * @route   DELETE /api/v1/wishlist/:wishlistId
 * @access  Private/User
 */
export const deleteWishlist = Factory.deleteOne(Wishlist);