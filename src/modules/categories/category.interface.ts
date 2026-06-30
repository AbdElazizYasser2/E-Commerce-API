import { Document, Model, Types } from "mongoose";

export interface ICategory extends Document {
  parent: Types.ObjectId | null;
  name: string;
  slug: string;
  description?: string;
  image: string | null;
  order: number;
  is_active: boolean;
  is_featured: boolean;
  is_deleted: boolean;
};

export interface ICategoryModel extends Model<ICategory> {}
