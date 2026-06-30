import mongoose, { Schema } from "mongoose";
import { CURRENCY_TYPES, LANGUAGE_TYPES } from "../../constants/setting.ts";
import { IUserSettings, IUserSettingsModel } from "./setting.interface.ts";

const userSettingsSchema = new Schema<IUserSettings, IUserSettingsModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      index: true,
      required: [true, "Settings must belong to a user"],
    },

    language: {
      type: String,
      enum: Object.values(LANGUAGE_TYPES),
      default: LANGUAGE_TYPES.AR,
    },

    currency: {
      type: String,
      enum: Object.values(CURRENCY_TYPES),
      default: CURRENCY_TYPES.EGP,
    },

    timezone: {
      type: String,
      default: "Africa/Cairo",
    },

    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      order_updates: { type: Boolean, default: true },
      promotions: { type: Boolean, default: false },
    },

    privacy: {
      show_profile: { type: Boolean, default: true },
      show_orders: { type: Boolean, default: false },
    },

  },
  { timestamps: true }
);

const UserSettings = mongoose.model<IUserSettings, IUserSettingsModel>(
  "UserSettings",
  userSettingsSchema
);
export default UserSettings;