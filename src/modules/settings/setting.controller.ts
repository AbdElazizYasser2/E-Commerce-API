import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as SettingsService from "./setting.service.ts";
import sendResponse from "../../utils/sendResponse.ts";
import { t } from "../../utils/translate.ts";

export const getUserSettings = asyncHandler(
  async (req: Request, res: Response) => {
    const settings = await SettingsService.getUserSettings(req.user!._id.toString());
    sendResponse(res, 200, t("setting:fetched"), settings);
  }
);

export const updateUserSettings = asyncHandler(
  async (req: Request, res: Response) => {
    const settings = await SettingsService.updateUserSettings(req.user!._id.toString(), req.body);
    sendResponse(res, 200, t("setting:updated"), settings);
  }
);

export const updateLanguage = asyncHandler(
  async (req: Request, res: Response) => {
    const settings = await SettingsService.updateLanguage(req.user!._id.toString(), req.body.language);
    sendResponse(res, 200, t("setting:language_updated"), settings);
  }
);

export const updateCurrency = asyncHandler(
  async (req: Request, res: Response) => {
    const settings = await SettingsService.updateCurrency(req.user!._id.toString(), req.body.currency);
    sendResponse(res, 200, t("setting:currency_updated"), settings);
  }
);

export const updateNotifications = asyncHandler(
  async (req: Request, res: Response) => {
    const settings = await SettingsService.updateNotifications(req.user!._id.toString(), req.body);
    sendResponse(res, 200, t("setting:notifications_updated"), settings);
  }
);

export const resetSettings = asyncHandler(
  async (req: Request, res: Response) => {
    const settings = await SettingsService.resetSettings(req.user!._id.toString());
    sendResponse(res, 200, t("setting:reset"), settings);
  }
);