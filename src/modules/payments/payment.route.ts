import { Router } from "express";
import {
  getAllTransactions,
  getUserTransactions,
  getTransactionById,
  createTransaction,
  updateTransactionStatus,
  getOrderTransactions,
} from "./payment.controller.ts";

import { protect, restrictTo } from "../../middlewares/auth.middleware.ts";

import {
  createTransactionValidator,
  getTransactionValidator,
  updateTransactionStatusValidator,
  getOrderTransactionsValidator,
} from "./payment.validation.ts";
import { paymentLimiter, paymentReadLimiter } from "../../middlewares/rate-Limit.middleware.ts";

const router = Router();

router.route("/")
  .get(
    paymentReadLimiter,
    protect, 
    restrictTo("admin"), 
    getAllTransactions
  )
  .post(
    paymentLimiter,
    protect, 
    restrictTo("admin"), 
    createTransactionValidator, 
    createTransaction
  );

router.get(
  "/my-transactions", 
  paymentReadLimiter,
  protect, 
  getUserTransactions
);

router.get(
  "/order/:orderId",
  paymentReadLimiter,
  protect,
  getOrderTransactionsValidator,
  getOrderTransactions
);

router.route("/:id")
  .get(
    paymentReadLimiter,
    protect, 
    getTransactionValidator, 
    getTransactionById
  )
  .put(
    paymentLimiter,
    protect,
    restrictTo("admin"),
    updateTransactionStatusValidator,
    updateTransactionStatus
  );

export default router;