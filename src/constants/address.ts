export const ADDRESS_TYPES = {
  SHIPPING: "shipping",
  BILLING: "billing",
  BOTH: "both",
} as const;

export type AddressType = (typeof ADDRESS_TYPES)[keyof typeof ADDRESS_TYPES];
