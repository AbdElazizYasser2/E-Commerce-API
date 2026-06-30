import mongoose, { Schema } from "mongoose";
import { NOTIFICATION_TYPES } from "../../constants/notification.ts";
import { INotification, INotificationModel } from "./notification.interface.ts";

const notificationSchema = new Schema<INotification, INotificationModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: [true, "Notification must belong to a user"],
    },

    title: {
      type: String,
      trim: true,
      required: [true, "Notification title is required"],
    },

    message: {
      type: String,
      trim: true,
      required: [true, "Notification message is required"],
    },

    type: {
      type: String,
      enum: Object.values(NOTIFICATION_TYPES),
      required: [true, "Notification type is required"],
    },

    is_read: {
      type: Boolean,
      default: false,
      index: true,
    },

    data: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, is_read: 1 });
notificationSchema.index({ createdAt: -1 });

const Notification = mongoose.model<INotification, INotificationModel>(
  "Notification",
  notificationSchema
);
export default Notification;