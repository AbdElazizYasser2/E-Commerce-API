import { check, body } from 'express-validator';
import validatorMiddleware from '../middlewares/validatorMiddleware.js';
import ShippingMethod from '../models/ShippingMethod.js';

export const createShippingMethodValidator = [
  check('name')
    .notEmpty().withMessage('Shipping method name is required')
    .trim()
    .custom(async (val) => {
      const existingMethod = await ShippingMethod.findOne({ name: val });
      if (existingMethod) throw new Error('Shipping method name already exists');
      return true;
    }),

  check('cost')
    .notEmpty().withMessage('Shipping cost is required')
    .isNumeric().withMessage('Cost must be a number')
    .isFloat({ min: 0 }).withMessage('Cost cannot be negative'),

  check('free_shipping_threshold')
    .optional()
    .isNumeric().withMessage('Threshold must be a number')
    .isFloat({ min: 0 }).withMessage('Threshold cannot be negative'),

  check('estimated_days_min')
    .optional()
    .isInt({ min: 0 }).withMessage('Min days must be a positive integer'),

  check('estimated_days_max')
    .optional()
    .isInt({ min: 0 }).withMessage('Max days must be a positive integer')
    .custom((val, { req }) => {
      if (req.body.estimated_days_min && val < req.body.estimated_days_min) {
        throw new Error('Max estimated days must be greater than or equal to min days');
      }
      return true;
    }),

  check('is_active')
    .optional()
    .isBoolean().withMessage('is_active must be a boolean'),

  validatorMiddleware,
];

export const getShippingMethodValidator = [
  check('id').isMongoId().withMessage('Invalid Shipping Method ID format'),
  validatorMiddleware,
];

export const updateShippingMethodValidator = [
  check('id').isMongoId().withMessage('Invalid Shipping Method ID format'),

  body('name')
    .optional()
    .trim()
    .custom(async (val, { req }) => {
      const existingMethod = await ShippingMethod.findOne({ name: val });
      if (existingMethod && existingMethod._id.toString() !== req.params.id) throw new Error('Shipping method name already in use');
      return true;
    }),

  body('cost').optional().isNumeric().isFloat({ min: 0 }),
  
  body('estimated_days_max').optional().custom((val, { req }) => {
      if (req.body.estimated_days_min && val < req.body.estimated_days_min) {
        throw new Error('Max days must be greater than min days');
      }
      return true;
  }),

  validatorMiddleware,
];

export const deleteShippingMethodValidator = [
  check('id').isMongoId().withMessage('Invalid Shipping Method ID format'),
  validatorMiddleware,
];