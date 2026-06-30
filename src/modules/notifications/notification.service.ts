import Notification from "./notification.model.ts";
import { INotification } from "./notification.interface.ts";
import ApiError from "../../utils/ApiError.ts";
import ApiFeatures, { QueryString } from "../../utils/ApiFeatures.ts";
import { NotificationType } from "../../constants/notification.ts";
import { t } from "../../utils/translate.ts";

export const getUserNotifications = async (userId: string, queryString: QueryString) => {
  const totalDocs = await Notification.countDocuments({ user: userId });
  const features = new ApiFeatures<INotification>(Notification.find({ user: userId }), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate(totalDocs);

  const notifications = await features.query;
  return {
    results: notifications.length,
    pagination: features.paginationResult,
    data: notifications,
  };
};

export const getUnreadCount = async (userId: string) => {
  const count = await Notification.countDocuments({ user: userId, is_read: false });
  return { unread_count: count };
};

export const createNotification = async (data: {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  data?: Record<string, unknown>;
}) => {
  const notification = await Notification.create({
    user: data.userId,
    title: data.title,
    message: data.message,
    type: data.type,
    data: data.data,
  });
  return notification;
};

export const markAsRead = async (id: string, userId: string) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: id, user: userId },
    { is_read: true },
    { new: true }
  );
  if (!notification)
    throw new ApiError(t("notification:not_found", { id }), 404);
  return notification;
};

export const markAllAsRead = async (userId: string) => {
  await Notification.updateMany(
    { user: userId, is_read: false },
    { is_read: true }
  );
};

export const deleteNotification = async (id: string, userId: string) => {
  const notification = await Notification.findOneAndDelete({ _id: id, user: userId });
  if (!notification)
    throw new ApiError(t("notification:not_found", { id }), 404);
};

export const deleteAllNotifications = async (userId: string) => {
  await Notification.deleteMany({ user: userId });
};