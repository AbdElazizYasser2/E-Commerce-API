import { Document, Model } from "mongoose";

export interface IShippingMethod extends Document {
  name: string;
  description?: string;
  cost: number;
  free_shipping_threshold: number | null;
  estimated_days_min?: number;
  estimated_days_max?: number;
  is_active: boolean;
};

export interface IShippingMethodModel extends Model<IShippingMethod> {}
