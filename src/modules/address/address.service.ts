import Address from "./address.model.ts";
import { IAddress } from "./address.interface.ts";
import ApiError from "../../utils/ApiError.ts";
import { t } from "../../utils/translate.ts";

export const getAllAddresses = async (userId: string) => {
  const addresses = await Address.find({ user: userId });
  return {
    results: addresses.length,
    data: addresses,
  };
};

export const getAddressById = async (id: string, userId: string) => {
  const address = await Address.findOne({ _id: id, user: userId });
  if (!address)
    throw new ApiError(t("address:not_found", { id }), 404);
  return address;
};

export const createAddress = async (userId: string, data: Partial<IAddress>) => {
  if (data.is_default) {
    await Address.updateMany({ user: userId }, { is_default: false });
  }
  const address = await Address.create({ ...data, user: userId });
  return address;
};

export const updateAddress = async (id: string, userId: string, data: Partial<IAddress>) => {
  if (data.is_default) {
    await Address.updateMany({ user: userId }, { is_default: false });
  }
  const address = await Address.findOneAndUpdate(
    { _id: id, user: userId },
    data,
    { new: true }
  );
  if (!address)
    throw new ApiError(t("address:not_found", { id }), 404);
  return address;
};

export const deleteAddress = async (id: string, userId: string) => {
  const address = await Address.findOneAndUpdate(
    { _id: id, user: userId },
    { is_deleted: true },
    { new: true }
  );
  if (!address)
    throw new ApiError(t("address:not_found", { id }), 404);
};