import { check } from 'express-validator';
import validatorMiddleware from 'src/middlewares/validatorMiddleware.js';

export const createReviewValidator = [
  check('ttile')
    .optional()
    .isString().withMessage('Title must be a string'),

  check('rating')
    .notEmpty().withMessage('Review rating is required')
    .isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1.0 and 5.0'),
    
  check('product')
    .notEmpty().withMessage('Review must belong to a product')
    .isMongoId().withMessage('Invalid Product ID format')
    .custom(async (val, { req }) => {
      const existingReview = await Review.findOne({ user: req.user._id, product: val });
      if (existingReview) throw new Error('You have already reviewed this product');
      return true;
    }),  

  validatorMiddleware,  
];

export const getReviewValidator = [
  check('id').isMongoId().withMessage('Invalid Review ID format'),
  validatorMiddleware,
];

export const updateReviewValidator = [
  check('id')
    .isMongoId().withMessage('Invalid Review ID format')
    .custom(async (val, { req }) => {
      const review = await Review.findById(val);
      if (!review) throw new Error('No review found for this ID');
      
      if (review.user.toString() !== req.user._id.toString()) throw new Error('You are not authorized to perform this action');
      return true;
    }),

  body('title').optional(),
  
  body('rating')
    .optional()
    .isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1.0 and 5.0'),

  validatorMiddleware,
];

export const deleteReviewValidator = [
  check('id')
    .isMongoId().withMessage('Invalid Review ID format')
    .custom(async (val, { req }) => {
      if (req.user.role === 'customer') {
        const review = await Review.findById(val);
        if (!review) throw new Error('No review found');
        if (review.user.toString() !== req.user._id.toString()) throw new Error('You are not authorized to delete this review');
      }
      return true;
    }),
    
  validatorMiddleware,
];