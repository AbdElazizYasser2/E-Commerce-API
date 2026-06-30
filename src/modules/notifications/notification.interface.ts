import { Document, Model, Types } from "mongoose";
import { NotificationType } from "../../constants/notification.ts";

export interface INotification extends Document {
  user: Types.ObjectId;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  data?: Record<string, unknown>;
}

export interface INotificationModel extends Model<INotification> {}