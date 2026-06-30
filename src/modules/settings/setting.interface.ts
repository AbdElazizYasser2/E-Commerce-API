import { Document, Model, Types } from "mongoose";
import { CurrencyTypes, LanguageTypes } from "../../constants/setting.ts";

export interface IUserSettings extends Document {
  user: Types.ObjectId;
  language: LanguageTypes;
  currency: CurrencyTypes;
  timezone: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    order_updates: boolean;
    promotions: boolean;
  };
  privacy: {
    show_profile: boolean;
    show_orders: boolean;
  };
}

export interface IUserSettingsModel extends Model<IUserSettings> {}