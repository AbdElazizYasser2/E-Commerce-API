import asyncHandler from 'express-async-handler';
import { Request, Response } from "express";
import * as ShippingMethodService from './shippingMethod.service.ts';
import sendResponse from '../../utils/sendResponse.ts';
import { t } from "../../utils/translate.ts";

export const getAllShippingMethods = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ShippingMethodService.getAllShippingMethods();
    sendResponse(res, 200, t("shippingMethod:all_fetched"), result);
  }
);

export const getShippingMethodById = asyncHandler(
  async (req: Request, res: Response) => {
    const shippingMethod = await ShippingMethodService.getShippingMethodById(req.params.id as string);
    sendResponse(res, 200, t("shippingMethod:fetched"), shippingMethod);
  }
);

export const createShippingMethod = asyncHandler(
  async (req: Request, res: Response) => {
    const shippingMethod = await ShippingMethodService.createShippingMethod(req.body);
    sendResponse(res, 201, t("shippingMethod:created"), shippingMethod);
  }
);

export const updateShippingMethod = asyncHandler(
  async (req: Request, res: Response) => {
    const shippingMethod = await ShippingMethodService.updateShippingMethod(
      req.params.id as string,
      req.body
    );
    sendResponse(res, 200, t("shippingMethod:updated"), shippingMethod);
  }
);

export const deleteShippingMethod = asyncHandler(
  async (req: Request, res: Response) => {
    await ShippingMethodService.deleteShippingMethod(req.params.id as string);
    sendResponse(res, 204, t("shippingMethod:deleted"));
  }
);