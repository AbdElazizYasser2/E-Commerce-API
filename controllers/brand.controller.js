import Brand from '../models/Brand.js';
import Factory from '../utils/handlersFactory.js';

/**
 * @desc    Create new brand
 * @route   POST /api/v1/brands
 * @access  Private/Admin
 */
export const createBrand = Factory.createOne(Brand);

/**
 * @desc    Get list of brands
 * @route   GET /api/v1/brands
 * @access  Public
 */
export const getBrands = Factory.getAll(Brand);

/**
 * @desc    Get brand by ID
 * @route   GET /api/v1/brands/:brandId
 * @access  Public
 */
export const getBrand = Factory.getOne(Brand);

/**
 * @desc    Update specific Brand
 * @route   PUT /api/v1/brands/:brandId
 * @access  Private/Admin
 */
export const updateBrand = Factory.updateOne(Brand);

/**
 * @desc    Delete specific Brand
 * @route   DELETE /api/v1/brands/:brandId
 * @access  Private/Admin
 */
export const deleteBrand = Factory.deleteOne(Brand);