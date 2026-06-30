import { Router } from "express";
import {
  createShippingMethod,
  getShippingMethodById,
  getAllShippingMethods,
  updateShippingMethod,
  deleteShippingMethod,
} from "./shippingMethod.controller.ts";

import { protect, restrictTo } from "../../middlewares/auth.middleware.ts";

import {
  createShippingMethodValidator,
  updateShippingMethodValidator,
  getShippingMethodValidator,
  deleteShippingMethodValidator,
} from "./shippingMethod.validation.ts";

const router = Router();

router.route("/")
  .get(getAllShippingMethods)
  .post(protect, restrictTo("admin"),
    createShippingMethodValidator,
    createShippingMethod
  );

router.route("/:id")
  .get(getShippingMethodValidator, getShippingMethodById)
  .put(protect, restrictTo("admin"),
    updateShippingMethodValidator,
    updateShippingMethod
  )
  .delete(protect, restrictTo("admin"),
    deleteShippingMethodValidator,
    deleteShippingMethod
  );

export default router;