import { Router } from "express";
import {
  register,
  login,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  changePassword,
} from "./auth.controller.ts";
import { protect } from "../../middlewares/auth.middleware.ts";
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  verifyResetCodeValidator,
  resetPasswordValidator,
  changePasswordValidator,
} from "./auth.validation.ts";
import { authLimiter } from "../../middlewares/rate-Limit.middleware.ts";

const router = Router();

router.post(
  "/register", 
  authLimiter,
  registerValidator, 
  register
);
router.post(
  "/login", 
  authLimiter,
  loginValidator, 
  login
);
router.post(
  "/forgot-password", 
  authLimiter,
  forgotPasswordValidator, 
  forgotPassword
);
router.post(
  "/verify-reset-code", 
  authLimiter,
  verifyResetCodeValidator, 
  verifyResetCode
);
router.post(
  "/reset-password",
  authLimiter, 
  resetPasswordValidator, 
  resetPassword
);
router.put(
  "/change-password", 
  authLimiter,
  protect, 
  changePasswordValidator, 
  changePassword
);

export default router;