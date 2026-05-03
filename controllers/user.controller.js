import User from '../models/User.js';
import Factory from '../utils/handlersFactory.js';

/**
 * @desc    Create new User
 * @route   POST /api/v1/users
 * @access  Private/Admin
 */
export const createUser = Factory.createOne(User);

/**
 * @desc    Get list of users
 * @route   GET /api/v1/users
 * @access  Private/Admin
 */
export const getUsers = Factory.getAll(User);

/**
 * @desc    Get specific user by id
 * @route   GET /api/v1/users/:userId
 * @access  Private/Admin
 */
export const getUser = Factory.getOne(User);

/**
 * @desc    Update specific user by id
 * @route   PUT /api/v1/users/:userId
 * @access  Private/Admin
 */
export const updateUser = Factory.updateOne(User);

/**
 * @desc    delete user
 * @route   DELETE /api/v1/users/:userId
 * @access  Private/Admin
 */
export const deleteUser = Factory.deleteOne(User);