import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  changeUserPassword,
  deleteUser,
} from "./user.controller.ts";

import { protect, restrictTo } from "../../middlewares/auth.middleware.ts";

import {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  changeUserPasswordValidator,
  deleteUserValidator,
} from './user.validation.ts';

const router = Router();

router.use(protect, restrictTo('admin'));

router.route("/")
  .get(getAllUsers)
  .post(createUserValidator, createUser);

router.route("/:id")
  .get(getUserValidator, getUserById)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

router.put("/:id/change-password", changeUserPasswordValidator, changeUserPassword);

export default router;