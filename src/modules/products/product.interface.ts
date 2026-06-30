import { Document, Model, Types } from "mongoose";
import { StockStatus } from "../../constants/product.ts";

export interface IProduct extends Document {
  name: string;
  slug: string;
  sku?: string;

  description: string;

  price: number;
  compare_price: number | null;
  cost: number | null;
  quantity: number;

  low_stock_threshold: number;
  track_inventory: boolean;

  stock_status: StockStatus;

  image: string;
  images: string[];

  is_active: boolean;
  is_featured: boolean;

  views_count: number;
  rating: number;
  reviews_count: number;

  category: Types.ObjectId;
  brand?: Types.ObjectId;
};

export interface IProductModel extends Model<IProduct> {}