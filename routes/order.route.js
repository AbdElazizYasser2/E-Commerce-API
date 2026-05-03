import express from "express";
import {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import {
  createOrderValidator,
  updateOrderValidator,
  getOrderValidator,
  deleteOrderValidator,
} from "../validators/orderValidator.js";

const router = express.Router();

router.route('/')
  .get(protect, restrictTo('admin'), getOrders)
  .post(
    protect,
    createOrderValidator,
    createOrder
  );

router.route('/:id')
  .get(protect, getOrderValidator, getOrder)
  .put(
    protect,
    restrictTo('admin'),
    updateOrderValidator,
    updateOrder
  )
  .delete(
    protect,
    restrictTo('admin'),
    deleteOrderValidator,
    deleteOrder
  );

export default router;