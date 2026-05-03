import Factory from "../utils/handlersFactory.js";
import Product from '../models/Product.js';

/**
 * @desc    Get All Products
 * @route   GET /api/v1/products
 * @access  Public
 */
export const getProducts = Factory.getAll(Product);

/**
 * @desc    Get Single Product
 * @route   GET /api/v1/products/:productId
 * @access  Public
 */
export const getProduct = Factory.getOne(Product);

/**
 * @desc    Create Product
 * @route   POST /api/v1/products
 * @access  Private/Admin
 */
export const createProduct = Factory.createOne(Product);

/**
 * @desc    Update Product By ID
 * @route   PUT /api/v1/products/:productId
 * @access  Private/Admin
 */
export const updateProduct = Factory.updateOne(Product);

/**
 * @desc    Delete Product By ID
 * @route   DELETE /api/v1/products/:productId
 * @access  Private/Admin
 */
export const deleteProduct = Factory.deleteOne(Product);