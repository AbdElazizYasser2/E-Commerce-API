import { Router } from "express";
import {
  createAddress,
  getAddressById,
  getAllAddresses,
  updateAddress,
  deleteAddress,
} from "./address.controller.ts";

import { protect, restrictTo } from "../../middlewares/auth.middleware.ts";

import {
  createAddressValidator,
  updateAddressValidator,
  getAddressValidator,
  deleteAddressValidator,
} from './address.validation.ts';

const router = Router();

router.route("/")
  .get(protect, restrictTo("admin"), getAllAddresses)
  .post(protect, createAddressValidator, createAddress);

router.route("/:id")
  .get(protect, getAddressValidator, getAddressById)
  .put(protect, updateAddressValidator, updateAddress)
  .delete(protect, deleteAddressValidator, deleteAddress);

export default router;