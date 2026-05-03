import { check, body } from 'express-validator';
import validatorMiddleware from '../middlewares/validatorMiddleware.js';
import Coupon from '../models/Coupon.js';

export const createCouponValidator = [
  check('name')
    .notEmpty().withMessage('Coupon name is required')
    .isString().withMessage('Coupon name must be a string')
    .toUpperCase() 
    .custom(async (val) => {
      const existingCoupon = await Coupon.findOne({ name: val });
      if (existingCoupon) throw new Error('Coupon code already exists');
      return true;
    }),

  check('type')
    .optional()
    .isIn(['fixed', 'percentage']).withMessage('Type must be fixed or percentage'),

  check('discount')
    .notEmpty().withMessage('Discount value is required')
    .isNumeric().withMessage('Discount must be a number')
    .custom((val, { req }) => {
      if (req.body.type === 'percentage' && (val <= 0 || val > 100)) {
        throw new Error('Percentage discount must be between 1 and 100');
      }
      if (val <= 0) {
        throw new Error('Discount must be a positive number');
      }
      return true;
    }),

  check('start_at')
    .notEmpty().withMessage('Start date is required')
    .isISO8601().withMessage('Invalid start date format (ISO8601)'),

  check('expire_at')
    .notEmpty().withMessage('Expiration date is required')
    .isISO8601().withMessage('Invalid expiration date format')
    .custom((val, { req }) => {
      const startDate = new Date(req.body.start_at);
      const expireDate = new Date(val);
      if (expireDate <= startDate) {
        throw new Error('Expiration date must be after start date');
      }
      return true;
    }),

  check('is_active')
    .optional()
    .isBoolean().withMessage('is_active must be a boolean'),

  validatorMiddleware,
];

export const getCouponValidator = [
  check('id').isMongoId().withMessage('Invalid Coupon ID format'),
  validatorMiddleware,
];

export const updateCouponValidator = [
  check('id').isMongoId().withMessage('Invalid Coupon ID format'),

  body('name')
    .optional()
    .toUpperCase()
    .custom(async (val, { req }) => {
      const existingCoupon = await Coupon.findOne({ name: val });
      if (existingCoupon && existingCoupon._id.toString() !== req.params.id) throw new Error('Coupon code already in use');
      return true;
    }),

  body('discount')
    .optional()
    .isNumeric()
    .custom((val, { req }) => {
      if (val <= 0) throw new Error('Discount must be positive');
      return true;
    }),

  body('expire_at')
    .optional()
    .isISO8601()
    .custom((val, { req }) => {
      return true;
    }),

  validatorMiddleware,
];

export const deleteCouponValidator = [
  check('id').isMongoId().withMessage('Invalid Coupon ID format'),
  validatorMiddleware,
];