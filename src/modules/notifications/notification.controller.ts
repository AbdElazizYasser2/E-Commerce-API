import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as NotificationService from "./notification.service.ts";
import sendResponse from "../../utils/sendResponse.ts";
import { t } from "../../utils/translate.ts";

export const getUserNotifications = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await NotificationService.getUserNotifications(
      req.user!._id.toString(),
      req.query as any
    );
    sendResponse(res, 200, t("notification:fetched"), result);
  }
);

export const getUnreadCount = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await NotificationService.getUnreadCount(req.user!._id.toString());
    sendResponse(res, 200, t("notification:unread_count_fetched"), result);
  }
);

export const markAsRead = asyncHandler(
  async (req: Request, res: Response) => {
    const notification = await NotificationService.markAsRead(
      req.params.id as string,
      req.user!._id.toString()
    );
    sendResponse(res, 200, t("notification:marked_as_read"), notification);
  }
);

export const markAllAsRead = asyncHandler(
  async (req: Request, res: Response) => {
    await NotificationService.markAllAsRead(req.user!._id.toString());
    sendResponse(res, 200, t("notification:all_marked_as_read"));
  }
);

export const deleteNotification = asyncHandler(
  async (req: Request, res: Response) => {
    await NotificationService.deleteNotification(
      req.params.id as string,
      req.user!._id.toString()
    );
    sendResponse(res, 204, t("notification:deleted"));
  }
);

export const deleteAllNotifications = asyncHandler(
  async (req: Request, res: Response) => {
    await NotificationService.deleteAllNotifications(req.user!._id.toString());
    sendResponse(res, 204, t("notification:all_deleted"));
  }
);