import { Document, Model, Types } from "mongoose";
import { OrderStatus, PaymentMethod, PaymentStatus } from "../../constants/order.ts";

export interface ICartItem {
  product: Types.ObjectId;
  quantity: number;
  color?: string;
  price: number;
  total?: number;
}

export interface IShippingAddress {
  details?: string;
  phone?: string;
  city?: string;
  postalCode?: string;
}

export interface IOrder extends Document {
  order_number: string;
  user: Types.ObjectId;
  cartItems: ICartItem[];
  shippingAddress: IShippingAddress;

  subtotal: number;
  tax: number;
  shipping_cost: number;
  discount: number;
  total: number;

  currency: string;

  status: OrderStatus;
  payment_status: PaymentStatus;
  paymentMethodType: PaymentMethod;

  transaction_id: string | null;
  coupon_code: string | null;
  notes: string | null;

  paid_at?: Date;
  shipped_at?: Date;
  delivered_at?: Date;
  is_deleted: boolean;
  deleted_at: Date | null;
}

export interface IOrderModel extends Model<IOrder> {}