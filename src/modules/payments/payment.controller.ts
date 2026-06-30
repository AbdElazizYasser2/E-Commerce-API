import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as TransactionService from "./payment.service.ts";
import sendResponse from "../../utils/sendResponse.ts";
import { t } from "../../utils/translate.ts";

export const getAllTransactions = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await TransactionService.getAllTransactions(req.query as any);
    sendResponse(res, 200, t("payment:all_fetched"), result);
  }
);

export const getUserTransactions = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await TransactionService.getUserTransactions(
      req.user!._id.toString(),
      req.query as any
    );
    sendResponse(res, 200, t("payment:user_fetched"), result);
  }
);

export const getTransactionById = asyncHandler(
  async (req: Request, res: Response) => {
    const transaction = await TransactionService.getTransactionById(req.params.id as string);
    sendResponse(res, 200, t("payment:fetched"), transaction);
  }
);

export const createTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const transaction = await TransactionService.createTransaction(req.body);
    sendResponse(res, 201, t("payment:created"), transaction);
  }
);

export const updateTransactionStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const transaction = await TransactionService.updateTransactionStatus(
      req.params.id as string,
      req.body.status,
      req.body.payment_result
    );
    sendResponse(res, 200, t("payment:status_updated"), transaction);
  }
);

export const getOrderTransactions = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await TransactionService.getOrderTransactions(req.params.orderId as string);
    sendResponse(res, 200, t("payment:order_fetched"), result);
  }
);