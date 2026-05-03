import validatorMiddleware from '../middlewares/validatorMiddleware.js';
import { check, body } from 'express-validator';
import slugify from 'slugify';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Brand from '../models/Brand.js';

export const createProductValidator = [
  check('name')
    .notEmpty().withMessage('Product name is required')
    .isString().withMessage('Product name must be a string')
    .isLength({ min: 3 }).withMessage('Product name is too short')
    .custom(async (val, { req }) => {
      const existingProduct = await Product.findOne({ name: val });
      if (existingProduct) throw new Error('Product name already exists');
      req.body.slug = slugify(val);
      return true;
    }),

  check('sku')
    .notEmpty().withMessage('Product SKU is required')
    .custom(async (val) => {
      const existingSku = await Product.findOne({ sku: val.toUpperCase() });
      if (existingSku) throw new Error('SKU already exists');
      return true;
    }),

  check('description')
    .notEmpty().withMessage('Product description is required')
    .isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),

  check('price')
    .notEmpty().withMessage('Product price is required')
    .isNumeric().withMessage('Price must be a number')
    .isFloat({ max: 1000000 }).withMessage('Price is too high'),

  check('compare_price')
    .optional()
    .isNumeric().withMessage('Compare price must be a number')
    .custom((val, { req }) => {
      if (val <= req.body.price) throw new Error('Compare price must be greater than product price');
      return true;
    }),

  check('quantity')
    .optional()
    .isNumeric().withMessage('Quantity must be a number')
    .isInt({ min: 0 }).withMessage('Quantity cannot be negative'),

  check('category')
    .notEmpty().withMessage('Product must belong to a category')
    .isMongoId().withMessage('Invalid Category ID format')
    .custom(async (val) => {
      const category = await Category.findById(val);
      if (!category) throw new Error(`No category found for this id: ${val}`);
      return true;
    }),

  check('brand')
    .optional()
    .isMongoId().withMessage('Invalid Brand ID format')
    .custom(async (val) => {
      const brand = await Brand.findById(val);
      if (!brand) throw new Error(`No brand found for this id: ${val}`);
      return true;
    }),

  check('stock_status')
    .optional()
    .isIn(['in_stock', 'out_of_stock', 'on_backorder']).withMessage('Invalid stock status'),

  validatorMiddleware,
];

export const getProductValidator = [
  check('id').isMongoId().withMessage('Invalid Product ID format'),
  validatorMiddleware,
];

export const updateProductValidator = [
  check('id').isMongoId().withMessage('Invalid Product ID format'),

  body('name')
    .optional()
    .custom(async (val, { req }) => {
      const existingProduct = await Product.findOne({ name: val });
      if (existingProduct && existingProduct._id.toString() !== req.params.id) throw new Error('Product name already in use');
      req.body.slug = slugify(val);
      return true;
    }),

  body('price').optional().isNumeric(),
  
  body('compare_price')
    .optional()
    .isNumeric()
    .custom((val, { req }) => {
      if (req.body.price && val <= req.body.price) throw new Error('Compare price must be greater than product price');
      return true;
    }),

  body('category').optional().isMongoId(),
  body('brand').optional().isMongoId(),

  validatorMiddleware,
];

export const deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid Product ID format'),
  validatorMiddleware,
];