import { check, body } from 'express-validator';
import validatorMiddleware from '../middlewares/validatorMiddleware.js';
import Order from '../models/Order.js';

export const createTransactionValidator = [
  check('order')
    .notEmpty().withMessage('Order ID is required')
    .isMongoId().withMessage('Invalid Order ID format')
    .custom(async (val) => {
      const order = await Order.findById(val);
      if (!order) throw new Error(`No order found for this id: ${val}`);
      return true;
    }),

  check('payment_method')
    .notEmpty().withMessage('Payment method is required')
    .isIn(['card', 'cash', 'wallet', 'fawry']).withMessage('Invalid payment method'),

  check('transaction_id')
    .notEmpty().withMessage('Transaction ID from payment gateway is required'),

  check('amount')
    .notEmpty().withMessage('Amount is required')
    .isNumeric().withMessage('Amount must be a number'),

  check('status')
    .optional()
    .isIn(['pending', 'success', 'failed', 'refunded']).withMessage('Invalid status'),

  validatorMiddleware,
];

export const getTransactionValidator = [
  check('id').isMongoId().withMessage('Invalid Transaction ID format'),
  validatorMiddleware,
];

export const updateTransactionStatusValidator = [
  check('id').isMongoId().withMessage('Invalid Transaction ID format'),
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['pending', 'success', 'failed', 'refunded']),
  validatorMiddleware,
];