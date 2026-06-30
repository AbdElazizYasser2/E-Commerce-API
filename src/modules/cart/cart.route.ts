import { Router } from "express";
import {
  getCart,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart,
  applyCoupon,
} from "./cart.controller.ts";
import { protect } from "../../middlewares/auth.middleware.ts";
import {
  addItemToCartValidator,
  updateCartItemValidator,
  removeCartItemValidator,
  applyCouponValidator,
} from "./cart.validation.ts";

const router = Router();

router.route("/")
  .get(protect, getCart)
  .post(protect, addItemToCartValidator, addItemToCart)
  .delete(protect, clearCart);

router.route("/:itemId")
  .put(protect, updateCartItemValidator, updateCartItemQuantity)
  .delete(protect, removeCartItemValidator, removeItemFromCart);

router.post("/apply-coupon", protect, applyCouponValidator, applyCoupon);

export default router;