import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as UserService from "./user.service.ts";
import sendResponse from "../../utils/sendResponse.ts";
import { t } from "../../utils/translate.ts";

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers(req.query as any);
    sendResponse(res, 200, t("user:all_fetched"), result);
  }
);

export const getUserById = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await UserService.getUserById(req.params.id as string);
    sendResponse(res, 200, t("user:fetched"), user);
  }
);

export const createUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await UserService.createUser(req.body);
    sendResponse(res, 201, t("user:created"), user);
  }
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await UserService.updateUser(
      req.params.id as string,
      req.body
    );
    sendResponse(res, 200, t("user:updated"), user);
  }
);

export const changeUserPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await UserService.changeUserPassword(
      req.params.id as string,
      req.body.password
    );
    sendResponse(res, 200, t("user:password_changed"), user);
  }
);

export const deleteUser = asyncHandler(
  async (req: Request, res: Response) => {
    await UserService.deleteUser(req.params.id as string);
    sendResponse(res, 204, t("user:deleted"));
  }
);