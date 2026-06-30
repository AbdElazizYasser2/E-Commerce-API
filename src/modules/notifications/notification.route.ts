import { Router } from "express";
import {
  getUserNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
} from "./notification.controller.ts";
import { protect } from "../../middlewares/auth.middleware.ts";
import {
  getNotificationValidator,
  deleteNotificationValidator,
} from "./notification.validation.ts";

const router = Router();

router.get("/", protect, getUserNotifications);
router.get("/unread-count", protect, getUnreadCount);
router.put("/mark-all-read", protect, markAllAsRead);
router.delete("/", protect, deleteAllNotifications);

router.put("/:id/read", protect, getNotificationValidator, markAsRead);
router.delete("/:id", protect, deleteNotificationValidator, deleteNotification);

export default router;