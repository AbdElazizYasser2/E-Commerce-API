import { Document, Model, Types } from "mongoose";
import { PaymentMethods, PaymentStatus } from "../../constants/payment.ts";

export interface IPaymentResult {
  id?: string;
  status?: string;
  update_time?: string;
  email_address?: string;
}

export interface ITransaction extends Document {
  order: Types.ObjectId;
  user: Types.ObjectId;
  payment_method: PaymentMethods;
  transaction_id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  payment_result?: IPaymentResult;
  paid_at?: Date;
  refunded_at?: Date;
}

export interface ITransactionModel extends Model<ITransaction> {}