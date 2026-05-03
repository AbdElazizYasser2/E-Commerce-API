import { check, body } from 'express-validator';
import validatorMiddleware from '../middlewares/validatorMiddleware.js';

export const createAddressValidator = [
  check('first_name')
    .notEmpty().withMessage('First name is required')
    .trim(),

  check('last_name')
    .notEmpty().withMessage('Last name is required')
    .trim(),

  check('email')
    .optional()
    .isEmail().withMessage('Invalid email format'),

  check('phone')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone(['ar-EG', 'ar-SA', 'ar-KW'])
    .withMessage('Invalid phone number format for Egypt, SA, or Kuwait'),

  check('address_line1')
    .notEmpty().withMessage('Address line 1 is required'),

  check('city')
    .notEmpty().withMessage('City is required'),

  check('postal_code')
    .notEmpty().withMessage('Postal code is required'),

  check('type')
    .optional()
    .isIn(['shipping', 'billing', 'both']).withMessage('Invalid address type'),

  check('is_default')
    .optional()
    .isBoolean().withMessage('is_default must be a boolean'),

  validatorMiddleware,
];

export const getAddressValidator = [
  check('id').isMongoId().withMessage('Invalid Address ID format'),
  validatorMiddleware,
];

export const updateAddressValidator = [
  check('id').isMongoId().withMessage('Invalid Address ID format'),

  body('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA', 'ar-KW'])
    .withMessage('Invalid phone number format'),

  body('email').optional().isEmail().withMessage('Invalid email format'),
  
  body('type').optional().isIn(['shipping', 'billing', 'both']),
  
  body('is_default').optional().isBoolean(),

  validatorMiddleware,
];

export const deleteAddressValidator = [
  check('id').isMongoId().withMessage('Invalid Address ID format'),
  validatorMiddleware,
];