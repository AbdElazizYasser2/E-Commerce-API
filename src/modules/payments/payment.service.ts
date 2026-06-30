import Transaction from "./payment.model.ts";
import { ITransaction } from "./payment.interface.ts";
import ApiError from "../../utils/ApiError.ts";
import ApiFeatures, { QueryString } from "../../utils/ApiFeatures.ts";
import { PAYMENT_STATUS } from "../../constants/payment.ts";
import { t } from "../../utils/translate.ts";

export const getAllTransactions = async (queryString: QueryString) => {
  const totalDocs = await Transaction.countDocuments();
  const features = new ApiFeatures<ITransaction>(Transaction.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate(totalDocs);

  const transactions = await features.query;
  return {
    results: transactions.length,
    pagination: features.paginationResult,
    data: transactions,
  };
};

export const getUserTransactions = async (userId: string, queryString: QueryString) => {
  const totalDocs = await Transaction.countDocuments({ user: userId });
  const features = new ApiFeatures<ITransaction>(Transaction.find({ user: userId }), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate(totalDocs);

  const transactions = await features.query;
  return {
    results: transactions.length,
    pagination: features.paginationResult,
    data: transactions,
  };
};

export const getTransactionById = async (id: string) => {
  const transaction = await Transaction.findById(id)
    .populate("order")
    .populate("user", "first_name last_name email");
  if (!transaction)
    throw new ApiError(t("payment:not_found", { id }), 404);
  return transaction;
};

export const createTransaction = async (data: Partial<ITransaction>) => {
  const transaction = await Transaction.create({
    ...data,
    transaction_id: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  });
  return transaction;
};

export const updateTransactionStatus = async (
  id: string,
  status: ITransaction["status"],
  payment_result?: ITransaction["payment_result"]
) => {
  const updateData: Partial<ITransaction> = { status };

  if (status === PAYMENT_STATUS.SUCCESS) updateData.paid_at = new Date();
  if (status === PAYMENT_STATUS.REFUNDED) updateData.refunded_at = new Date();
  if (payment_result) updateData.payment_result = payment_result;

  const transaction = await Transaction.findByIdAndUpdate(id, updateData, { new: true });
  if (!transaction)
    throw new ApiError(t("payment:not_found", { id }), 404);
  return transaction;
};

export const getOrderTransactions = async (orderId: string) => {
  const transactions = await Transaction.find({ order: orderId });
  return {
    results: transactions.length,
    data: transactions,
  };
};