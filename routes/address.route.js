import express from "express";
import {
  createAddress,
  getAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller.js";

import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import {
  createAddressValidator,
  updateAddressValidator,
  getAddressValidator,
  deleteAddressValidator,
} from "../validators/addressValidator.js";

const router = express.Router();

router.route('/')
  .get(protect, restrictTo('admin'), getAddresses)
  .post(
    protect,
    createAddressValidator,
    createAddress
  );

router.route('/:id')
  .get(protect, getAddressValidator, getAddress)
  .put(
    protect,
    updateAddressValidator,
    updateAddress
  )
  .delete(protect, deleteAddressValidator, deleteAddress);

export default router;