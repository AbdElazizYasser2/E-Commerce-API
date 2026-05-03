import express from "express";
import { register } from "../controllers/auth/RegisteredUser.controller.js";
import { login, logout } from "../controllers/auth/AuthenticatedSession.controller.js";
import { forgotPassword, verifyResetCode, resetPassword } from "../controllers/auth/PasswordResetLink.controller.js";
import { changePassword } from "../controllers/auth/PasswordUpdate.controller.js";
import { getMe, updateMe, deleteMe } from "../controllers/auth/ProfileUpdate.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadSingleImage } from "../middlewares/uploadMiddleware.js";
import { processSingleImage } from "../middlewares/imageProcessingMiddleware.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);

router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-code', verifyResetCode);
router.put('/reset-password', resetPassword);

router.put('/change-password', protect, changePassword);

router.get('/me', protect, getMe);
router.put('/update-me', protect,
  uploadSingleImage('avatar'),
  processSingleImage('users', 'avatar'),
  updateMe
);
router.delete('/delete-me', protect, deleteMe);

export default router;