import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as OrderService from "./order.service.ts";
import sendResponse from "../../utils/sendResponse.ts";
import { t } from "../../utils/translate.ts";

export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await OrderService.getAllOrders(req.query as any);
    sendResponse(res, 200, t("order:all_fetched"), result);
  }
);

export const getUserOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await OrderService.getUserOrders(
      req.user!._id.toString(),
      req.query as any
    );
    sendResponse(res, 200, t("order:user_fetched"), result);
  }
);

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await OrderService.getOrderById(req.params.id as string);
    sendResponse(res, 200, t("order:fetched"), order);
  }
);

export const createOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await OrderService.createOrder(
      req.user!._id.toString(),
      req.body
    );
    sendResponse(res, 201, t("order:created"), order);
  }
);

export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await OrderService.updateOrderStatus(
      req.params.id as string,
      req.body.status
    );
    sendResponse(res, 200, t("order:status_updated"), order);
  }
);

export const updatePaymentStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await OrderService.updatePaymentStatus(
      req.params.id as string,
      req.body.payment_status
    );
    sendResponse(res, 200, t("order:payment_status_updated"), order);
  }
);

export const cancelOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await OrderService.cancelOrder(
      req.params.id as string,
      req.user!._id.toString()
    );
    sendResponse(res, 200, t("order:cancelled"), order);
  }
);

export const deleteOrder = asyncHandler(
  async (req: Request, res: Response) => {
    await OrderService.deleteOrder(req.params.id as string);
    sendResponse(res, 204, t("order:deleted"));
  }
);