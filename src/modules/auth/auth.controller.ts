import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as AuthService from "./auth.service.ts";
import sendResponse from "../../utils/sendResponse.ts";
import { t } from "../../utils/translate.ts";

export const register = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await AuthService.register(req.body);
    sendResponse(res, 201, t("auth:register_success"), result);
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body.email, req.body.password);
    sendResponse(res, 200, t("auth:login_success"), result);
  }
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await AuthService.forgotPassword(req.body.email);
    sendResponse(res, 200, t("auth:reset_code_sent"), result);
  }
);

export const verifyResetCode = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await AuthService.verifyResetCode(req.body.resetCode);
    sendResponse(res, 200, t("auth:reset_code_verified"), result);
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await AuthService.resetPassword(
      req.body.email,
      req.body.newPassword
    );
    sendResponse(res, 200, t("auth:password_reset_success"), result);
  }
);

export const changePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await AuthService.changePassword(
      req.user!._id.toString(),
      req.body.currentPassword,
      req.body.newPassword
    );
    sendResponse(res, 200, t("auth:password_changed"), result);
  }
);