import Factory from "../utils/handlersFactory.js";
import Category from '../models/Category.js';

/**
 * @desc    Get All Categories
 * @route   GET /api/v1/categories
 * @access  Public
 */
export const getCategories = Factory.getAll(Category);

/**
 * @desc    Get Single Category
 * @route   GET /api/v1/categories/:categoryId
 * @access  Public
 */
export const getCategory = Factory.getOne(Category);

/**
 * @desc    Create Category
 * @route   POST /api/v1/categories
 * @access  Private/Admin
 */
export const createCategory = Factory.createOne(Category);

/**
 * @desc    Update Category By ID
 * @route   PUT /api/v1/categories/:categoryId
 * @access  Private/Admin
 */
export const updateCategory = Factory.updateOne(Category);

/**
 * @desc    Delete Category By ID
 * @route   DELETE /api/v1/categories/:categoryId
 * @access  Private/Admin
 */
export const deleteCategory = Factory.deleteOne(Category);