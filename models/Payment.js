import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: [true, 'Transaction must belong to an order'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Transaction must belong to a user'],
    },
    payment_method: {
      type: String,
      enum: ['card', 'cash', 'wallet', 'fawry'],
      required: true,
    },
    transaction_id: { 
      type: String, 
      required: true, 
      unique: true 
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'EGP',
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed', 'refunded'],
      default: 'pending',
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
transactionSchema.index({ transaction_id: 1 });

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;