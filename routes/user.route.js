import express from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

import { protect, restrictTo } from "../middlewares/authMiddleware";
import { uploadSingleImage } from "../middlewares/uploadMiddleware";
import { processSingleImage } from "../middlewares/imageProcessingMiddleware ";
import {
  createUserValidator,
  updateUserValidator,
  getUserValidator,
  deleteUserValidator,
} from "../validators/userValidator.js";

const router = express.Router();

router.use(protect, restrictTo('admin'));

router.route('/')
  .get(getUsers)
  .post(
    uploadSingleImage('avatar'),
    processSingleImage('users', 'avatar'),
    createUserValidator,
    createUser
  );

router.route('/:id')
  .get(getUserValidator, getUser) 
  .put(
    uploadSingleImage('avatar'),
    processSingleImage('users', 'avatar'),
    updateUserValidator,
    updateUser
  )
  .delete(deleteUserValidator, deleteUser);
  
export default router;  