import { Router } from "express";
import {
  getWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
  clearWishlist,
} from "./wishlist.controller.ts";

import { protect } from "../../middlewares/auth.middleware.ts";

import {
  addProductToWishlistValidator,
  removeProductFromWishlistValidator,
} from "./wishlist.validation.ts";

const router = Router();

router.get("/", protect, getWishlist);

router.post("/:productId", protect,
  addProductToWishlistValidator,
  addProductToWishlist
);

router.delete("/:productId", protect,
  removeProductFromWishlistValidator,
  removeProductFromWishlist
);

router.delete("/clear", protect, clearWishlist);

export default router;