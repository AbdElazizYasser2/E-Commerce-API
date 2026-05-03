import express from "express";
import {
  createShippingMethod,
  getShippingMethod,
  getShippingMethods,
  updateShippingMethod,
  deleteShippingMethod,
} from "../controllers/shippingMethod.controller.js";

import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import {
  createShippingMethodValidator,
  updateShippingMethodValidator,
  getShippingMethodValidator,
  deleteShippingMethodValidator,
} from "../validators/shippingMethodValidator.js";

const router = express.Router();

router.route('/')
  .get(getShippingMethods)
  .post(
    protect,
    restrictTo('admin'),
    createShippingMethodValidator,
    createShippingMethod
  );

router.route('/:id')
  .get(getShippingMethodValidator, getShippingMethod)
  .put(
    protect,
    restrictTo('admin'),
    updateShippingMethodValidator,
    updateShippingMethod
  )
  .delete(
    protect,
    restrictTo('admin'),
    deleteShippingMethodValidator,
    deleteShippingMethod
  );

export default router;