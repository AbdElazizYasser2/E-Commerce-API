import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as AddressService from "./address.service.ts";
import sendResponse from "../../utils/sendResponse.ts";
import { t } from "../../utils/translate.ts";

export const getAllAddresses = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await AddressService.getAllAddresses(req.user!._id.toString());
    sendResponse(res, 200, t("address:all_fetched"), result);
  }
);

export const getAddressById = asyncHandler(
  async (req: Request, res: Response) => {
    const address = await AddressService.getAddressById(
      req.params.id as string,
      req.user!._id.toString()
    );
    sendResponse(res, 200, t("address:fetched"), address);
  }
);

export const createAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const address = await AddressService.createAddress(
      req.user!._id.toString(),
      req.body
    );
    sendResponse(res, 201, t("address:created"), address);
  }
);

export const updateAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const address = await AddressService.updateAddress(
      req.params.id as string,
      req.user!._id.toString(),
      req.body
    );
    sendResponse(res, 200, t("address:updated"), address);
  }
);

export const deleteAddress = asyncHandler(
  async (req: Request, res: Response) => {
    await AddressService.deleteAddress(
      req.params.id as string,
      req.user!._id.toString()
    );
    sendResponse(res, 204, t("address:deleted"));
  }
);