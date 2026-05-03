import { body, check, validationResult } from 'express-validator';
import validatorMiddleware from 'middlewares/validatorMiddleware.js'
import slugify from 'slugify';
import User from '../models/User';

export const createUserValidator = [
  check('first_name')
    .notEmpty().withMessage('First name is required')
    .trim()
    .isLength({ min: 2 }).withMessage('First name is too short'),

  check('last_name')
    .notEmpty().withMessage('Last name is required')
    .trim()
    .isLength({ min: 2 }).withMessage('Last name is too short'),
    
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) throw new Error('Email already in use');
      return true;
    }),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    
  check('passwordConfirm')
    .notEmpty().withMessage('Password confirmation is required')
    .custom((val, { req }) => {
      if (val !== req.body.password) throw new Error('Password confirmation does not match password');
      return true;
    }),

  check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA', 'ar-KW']).withMessage('Invalid phone number format'),
    
  check('role')
    .optional()
    .isIn(['customer', 'vendor']).withMessage('Role must be customer or vendor'),
    
  check('gender')
    .optional()
    .isIn(['male', 'female']).withMessage('Gender must be male or female'),
    
  validatorMiddleware
];

export const getUserValidator = [
  check('id').isMongoId().withMessage('Invalid User ID format'),
  validatorMiddleware
];

export const updateUserValidator = [
  check('id').isMongoId().withMessage('Invalid User ID format'),
  
  body('first_name').optional().trim(),

  body('last_name').optional().trim(),

  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format')
    .custom(async (val, { req }) => {
      const user = await User.findOne({ email: val });
      if (user && user._id.toString() !== req.params.id) throw new Error('Email already in use');
      return true; 
    }),

  check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA', 'ar-KW']).withMessage('Invalid phone number format'),  

  check('status')
    .optional()
    .isIn(['active', 'inactive', 'pending', 'banned']).withMessage('Invalid status value'),
    
  validatorMiddleware  
];

export const changeUserPasswordValidator = [
  check('id').isMongoId().withMessage('Invalid User ID format'),

  body('currentPassword')
    .notEmpty().withMessage('You must enter your current password'),

  body('passwordConfirm')
    .notEmpty().withMessage('You must enter the password confirm'),

  body('password')
    .notEmpty().withMessage('You must enter new password')
    .custom(async (val, { req }) => {
      if (val !== req.body.passwordConfirm) throw new Error('Password Confirmation incorrect');
      return true;
    }),

  validatorMiddleware,
];

export const deleteUserValidator = [
  check('id').isMongoId().withMessage('Invalid User ID format'),
  validatorMiddleware
];