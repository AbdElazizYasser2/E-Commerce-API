import ShippingMethod from "./shippingMethod.model.ts";
import { IShippingMethod } from "./shippingMethod.interface.ts";
import ApiError from "../../utils/ApiError.ts";
import { t } from "../../utils/translate.ts";

export const getAllShippingMethods = async () => {
  const shippingMethods = await ShippingMethod.find({ is_active: true });
  return {
    results: shippingMethods.length,
    data: shippingMethods,
  };
};

export const getShippingMethodById = async (id: string) => {
  const shippingMethod = await ShippingMethod.findById(id);
  if (!shippingMethod)
    throw new ApiError(t("shippingMethod:not_found", { id }), 404);
  return shippingMethod;
};

export const createShippingMethod = async (data: Partial<IShippingMethod>) => {
  const shippingMethod = await ShippingMethod.create(data);
  return shippingMethod;
};

export const updateShippingMethod = async (id: string, data: Partial<IShippingMethod>) => {
  const shippingMethod = await ShippingMethod.findByIdAndUpdate(id, data, { new: true });
  if (!shippingMethod)
    throw new ApiError(t("shippingMethod:not_found", { id }), 404);
  return shippingMethod;
};

export const deleteShippingMethod = async (id: string) => {
  const shippingMethod = await ShippingMethod.findByIdAndDelete(id);
  if (!shippingMethod)
    throw new ApiError(t("shippingMethod:not_found", { id }), 404);
};