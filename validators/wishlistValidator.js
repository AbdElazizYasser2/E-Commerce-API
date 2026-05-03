import { check } from 'express-validator';
import validatorMiddleware from '../middlewares/validatorMiddleware.js';
import Product from '../models/Product.js';

export const addProductToWishlistValidator = [
  check('productId')
    .notEmpty().withMessage('Product ID is required')
    .isMongoId().withMessage('Invalid Product ID format')
    .custom(async (val) => {
      const product = await Product.findById(val);
      if (!product) throw new Error(`No product found for this id: ${val}`);
      return true;
    }),
    
  validatorMiddleware,
];

export const removeProductFromWishlistValidator = [
  check('productId')
    .isMongoId().withMessage('Invalid Product ID format'),
    
  validatorMiddleware,
];