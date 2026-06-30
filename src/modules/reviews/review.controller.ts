import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as ReviewService from "./review.service.ts";
import sendResponse from "../../utils/sendResponse.ts";
import { t } from "../../utils/translate.ts";

export const getAllReviews = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ReviewService.getAllReviews(req.query as any);
    sendResponse(res, 200, t("review:all_fetched"), result);
  }
);

export const getProductReviews = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ReviewService.getProductReviews(
      req.params.productId as string,
      req.query as any
    );
    sendResponse(res, 200, t("review:product_fetched"), result);
  }
);

export const getReviewById = asyncHandler(
  async (req: Request, res: Response) => {
    const review = await ReviewService.getReviewById(req.params.id as string);
    sendResponse(res, 200, t("review:fetched"), review);
  }
);

export const createReview = asyncHandler(
  async (req: Request, res: Response) => {
    const review = await ReviewService.createReview(
      req.user!._id.toString(),
      req.body
    );
    sendResponse(res, 201, t("review:created"), review);
  }
);

export const updateReview = asyncHandler(
  async (req: Request, res: Response) => {
    const review = await ReviewService.updateReview(
      req.params.id as string,
      req.user!._id.toString(),
      req.body
    );
    sendResponse(res, 200, t("review:updated"), review);
  }
);

export const deleteReview = asyncHandler(
  async (req: Request, res: Response) => {
    await ReviewService.deleteReview(
      req.params.id as string,
      req.user!._id.toString(),
      req.user!.role as string
    );
    sendResponse(res, 204, t("review:deleted"));
  }
);