import { check, body } from 'express-validator';
import validatorMiddleware from '../middlewares/validatorMiddleware.js';

export const addProductToCartValidator = [
  check('product')
    .notEmpty().withMessage('Product ID is required')
    .isMongoId().withMessage('Invalid Product ID format'),

  check('color')
    .optional()
    .isString().withMessage('Color must be a string'),

  check('price')
    .optional()
    .isNumeric().withMessage('Price must be a number'),

  validatorMiddleware,
];

export const updateCartItemQuantityValidator = [
  check('id').isMongoId().withMessage('Invalid item ID format'),
    
  body('quantity')
    .notEmpty().withMessage('Quantity is required')
    .isNumeric().withMessage('Quantity must be a number')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),

  validatorMiddleware,
];

export const removeProductFromCartValidator = [
  check('id').isMongoId().withMessage('Invalid item ID format'),
  validatorMiddleware,
];