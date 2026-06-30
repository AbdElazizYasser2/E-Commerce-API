import { Document, Model, Types } from "mongoose";

export interface ICartItem {
  _id?: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  color?: string;
  price: number;
}

export interface ICart extends Document {
  user: Types.ObjectId;
  cartItems: ICartItem[];
  totalCartPrice: number;
  totalPriceAfterDiscount?: number;
}

export interface ICartModel extends Model<ICart> {}