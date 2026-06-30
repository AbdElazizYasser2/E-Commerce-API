import { Router } from "express";
import {
  getAllOrders,
  getUserOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  deleteOrder,
} from "./order.controller.ts";

import { protect, restrictTo } from "../../middlewares/auth.middleware.ts";

import {
  createOrderValidator,
  getOrderValidator,
  updateOrderStatusValidator,
  updatePaymentStatusValidator,
  cancelOrderValidator,
  deleteOrderValidator,
} from "./order.validation.ts";

const router = Router();

router.route("/")
  .get(protect, restrictTo("admin"), getAllOrders)
  .post(protect, createOrderValidator, createOrder);

router.get("/my-orders", protect, getUserOrders);

router.route("/:id")
  .get(protect, getOrderValidator, getOrderById)
  .delete(protect, restrictTo("admin"), deleteOrderValidator, deleteOrder);

router.put("/:id/status", protect,
  restrictTo("admin"),
  updateOrderStatusValidator,
  updateOrderStatus
);

router.put("/:id/payment-status", protect, restrictTo("admin"),
  updatePaymentStatusValidator,
  updatePaymentStatus
);

router.put(
  "/:id/cancel",
  protect,
  cancelOrderValidator,
  cancelOrder
);

export default router;