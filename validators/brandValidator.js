import slugify from 'slugify';
import { body, check } from "express-validator";
import validatorMiddleware from 'middlewares/validatorMiddleware.js';
import Brand from '../models/Brand';

export const createBrandValidator = [
  check('name')
    .notEmpty().withMessage('Brand name is required')
    .isLength({ min: 3, max: 100}).withMessage('Name length must be between 3 and 100 chars')
    .custom(async (val, { req }) => {
      const existingBrand = await Brand.findOne({ name: val });
      if (existingBrand) throw new Error('Brand name already exists');
      req.body.slug = slugify(val);
      return true;
    }),

  check('logo')
    .optional().isLength({ max: 255 })
    .isString().withMessage('Logo path must be a string'),

  check('website')
    .optional().isURL()
    .isLength({ max: 255 })
    .withMessage('Invalid website URL'),

  check('description')
    .optional()
    .isString().withMessage('Description must be a String'),

  check('is_active')
    .optional()
    .isBoolean().withMessage('is_active must be a boolean value'),

  validatorMiddleware
];

export const getBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand ID format'),
  validatorMiddleware
];

export const updateBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand ID format'),

  body('name')
    .optional()
    .isLength({ min: 3, max: 100 }).withMessage('Brand name must be between 3 and 100 chars')
    .custom(async (val, { req }) => {
      const existingBrand = await Brand.findOne({ name: val });
      if (existingBrand && existingBrand._id.toString() !== req.params.id) throw new Error('Brand name already in use');
      req.body.slug = slugify(val);
      return true;
    }),

  check('website').optional().isURL().withMessage('Invalid website URL'),  
  
  body('description')
  .optional()
  .isString().withMessage('Description must be a string'),
  
  body('website')
  .optional()
  .isURL().withMessage('Invalid URL'),
  
  body('is_active')
   .optional()
   .isBoolean().withMessage('is_active must be a boolean value'),
  validatorMiddleware
];

export const deleteBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand ID format'),
  validatorMiddleware
];