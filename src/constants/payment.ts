export const PAYMENT_METHODS = {
  CARD: "card",
  CASH: "cash",
  WALLET: "wallet",
  FAWRY: "fawry",
} as const;

export const PAYMENT_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

export type PaymentMethods = (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];
export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];