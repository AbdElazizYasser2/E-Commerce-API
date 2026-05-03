import Address from '../models/Address.js';
import Factory from '../utils/handlersFactory.js';

/**
 * @desc    Create new Address
 * @route   POST /api/v1/addresses
 * @access  Private/User
 */
export const createAddress = Factory.createOne(Address);

/**
 * @desc    Get list of addresses
 * @route   GET /api/v1/addresses
 * @access  Private/Admin
 */
export const getAddresses = Factory.getAll(Address);

/**
 * @desc    Get specific address by id
 * @route   GET /api/v1/addresses/:addressId
 * @access  Private/User
 */
export const getAddress = Factory.getOne(Address);

/**
 * @desc    Update specific address by id
 * @route   PUT /api/v1/addresses/:addressId
 * @access  Private/User
 */
export const updateAddress = Factory.updateOne(Address);

/**
 * @desc    Delete specific address by id
 * @route   DELETE /api/v1/addresses/:addressId
 * @access  Private/User
 */
export const deleteAddress = Factory.deleteOne(Address);