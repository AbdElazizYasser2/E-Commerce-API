import slugify from 'slugify';
import validatorMiddleware from 'middlewares/validatorMiddleware.js';
import { check, req } from 'express-validator';
import Category from '../models/Category';

export const createCategoryValidator = [
  check('name')
    .notEmpty().withMessage('Category name is required')
    .isString().withMessage('Category name must be a string')
    .isLength({ min: 3, max: 100}).withMessage('Name length must be between 3 and 100 chars')
    .custom(async (val, { req }) => {
      const existingCategory = await Category.findOne({ name: val });
      if (existingCategory) throw new Error('Category name is already exists');
      req.body.slug = slugify(val);
      return true; 
    }),

  check('parent_id')
    .optional()
    .isMongoId().withMessage('Invalid Parent Category ID format')
    .custom(async (val) => {
      const parentCategory = await Category.findById(val);
      if (!parentCategory) throw new Error(`No category found for this parent_id: ${val}`);
      return true;
    }),
    
  check('description')
    .optional()
    .isString().withMessage('Description must be a string'),

  check('order')
    .optional()
    .isNumeric().withMessage('Order must be a number'),

  check('is_active')
    .optional()
    .isBoolean().withMessage('is_active must be a boolean'),

  check('is_featured')
    .optional()
    .isBoolean().withMessage('is_featured must be a boolean'),

  validatorMiddleware,  
];

export const getCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Category ID format'),
  validatorMiddleware,
];

export const updateCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Category ID format'),

  body('name')
    .optional()
    .isString()
    .isLength({ min: 3, max: 100 })
    .custom(async (val, { req }) => {
      const existingCategory = await Category.findOne({ name: val });
      if (existingCategory && existingCategory._id.toString() !== req.params.id) throw new Error('Category name already in use');
      req.body.slug = slugify(val);
      return true;
    }),

  body('parent_id')
    .optional()
    .isMongoId().withMessage('Invalid Parent Category ID format')
    .custom(async (val, { req }) => {
      if (val === req.params.id) throw new Error('Category cannot be a parent of itself');
      const parentCategory = await Category.findById(val);
      if (!parentCategory) throw new Error(`Parent category not found`);
      return true;
    }),

  body('description').optional().isString(),
  body('order').optional().isNumeric(),
  body('is_active').optional().isBoolean(),
  body('is_featured').optional().isBoolean(),

  validatorMiddleware,
];

export const deleteCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Category ID format'),
  validatorMiddleware,
];