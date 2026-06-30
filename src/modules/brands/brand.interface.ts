import { Document, Model } from "mongoose";

export interface IBrand extends Document {
  name: String;
  slug: String;
  logo: String | null;
  website: String | null;
  description?: String;
  is_active: boolean;
  is_delete: boolean;
};

export interface IBrandModel extends Model<IBrand> {}