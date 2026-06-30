import UserSettings from "./setting.model.ts";
import { IUserSettings } from "./setting.interface.ts";
import ApiError from "../../utils/ApiError.ts";
import { CURRENCY_TYPES, LANGUAGE_TYPES } from "../../constants/setting.ts";
import { t } from "../../utils/translate.ts";

export const getUserSettings = async (userId: string) => {
  let settings = await UserSettings.findOne({ user: userId });
  if (!settings) {
    settings = await UserSettings.create({ user: userId });
  }
  return settings;
};

export const updateUserSettings = async (userId: string, data: Partial<IUserSettings>) => {
  const settings = await UserSettings.findOneAndUpdate(
    { user: userId },
    data,
    { new: true, upsert: true }
  );
  if (!settings) 
    throw new ApiError(t("setting:not_found"), 404);
  return settings;
};

export const updateLanguage = async (userId: string, language: IUserSettings["language"]) => {
  const settings = await UserSettings.findOneAndUpdate(
    { user: userId },
    { language },
    { new: true, upsert: true }
  );
  return settings;
};

export const updateCurrency = async (userId: string, currency: IUserSettings["currency"]) => {
  const settings = await UserSettings.findOneAndUpdate(
    { user: userId },
    { currency },
    { new: true, upsert: true }
  );
  return settings;
};

export const updateNotifications = async (userId: string, notifications: Partial<IUserSettings["notifications"]>) => {
  const settings = await UserSettings.findOneAndUpdate(
    { user: userId },
    { notifications },
    { new: true, upsert: true }
  );
  return settings;
};

export const resetSettings = async (userId: string) => {
  const settings = await UserSettings.findOneAndUpdate(
    { user: userId },
    {
      language: LANGUAGE_TYPES.AR,
      currency: CURRENCY_TYPES.EGP,
      timezone: "Africa/Cairo",
      notifications: {
        email: true,
        sms: true,
        push: true,
        order_updates: true,
        promotions: false,
      },
      privacy: {
        show_profile: true,
        show_orders: false,
      },
    },
    { new: true, upsert: true }
  );
  return settings;
};