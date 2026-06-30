import mongoose, { Schema } from "mongoose";
import { PAYMENT_METHODS, PAYMENT_STATUS } from "../../constants/payment.ts";
import { ITransaction, ITransactionModel } from "./payment.interface.ts";

const transactionSchema = new Schema<ITransaction, ITransactionModel>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Transaction must belong to an order"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Transaction must belong to a user"],
    },

    payment_method: {
      type: String,
      enum: Object.values(PAYMENT_METHODS),
      required: true,
    },

    transaction_id: {
      type: String,
      unique: true,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "EGP",
    },

    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },

    payment_result: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },

    paid_at: Date,

    refunded_at: Date,
  },
  { timestamps: true }
);

transactionSchema.index({ order: 1 });

const Transaction = mongoose.model<ITransaction, ITransactionModel>(
  "Transaction",
  transactionSchema
);
export default Transaction;