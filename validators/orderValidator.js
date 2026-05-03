import { check, body } from 'express-validator';
import validatorMiddleware from '../middlewares/validatorMiddleware.js';

export const createOrderValidator = [
  check('shippingAddress.details')
    .notEmpty().withMessage('Shipping details are required'),
  
  check('shippingAddress.phone')
    .notEmpty().withMessage('Shipping phone is required')
    .isMobilePhone(['ar-EG', 'ar-SA', 'ar-KW']).withMessage('Invalid phone number format'),

  check('shippingAddress.city')
    .notEmpty().withMessage('City is required'),

  check('paymentMethodType')
    .optional()
    .isIn(['card', 'cash']).withMessage('Payment method must be card or cash'),

  check('notes')
    .optional()
    .isString().withMessage('Notes must be a string')
    .isLength({ max: 500 }).withMessage('Notes are too long'),

  validatorMiddleware,
];

export const getOrderValidator = [
  check('id').isMongoId().withMessage('Invalid Order ID format'),
  validatorMiddleware,
];

export const updateOrderStatusValidator = [
  check('id').isMongoId().withMessage('Invalid Order ID format'),
  
  body('status')
    .optional()
    .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'failed'])
    .withMessage('Invalid status value'),

  body('payment_status')
    .optional()
    .isIn(['pending', 'paid', 'failed', 'refunded'])
    .withMessage('Invalid payment status value'),

  validatorMiddleware,
];