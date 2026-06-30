import asyncHandler from 'express-async-handler';
import { Request, Response } from "express";
import * as WishlistService from './wishlist.service.ts';
import sendResponse from "../../utils/sendResponse.ts";
import { t } from "../../utils/translate.ts";

export const getWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const wishlist = await WishlistService.getWishlist(req.user!._id.toString());
    sendResponse(res, 200, t("wishlist:fetched"), wishlist);
  }
);

export const addProductToWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const wishlist = await WishlistService.addProductToWishlist(
      req.user!._id.toString(),
      req.params.productId as string
    );
    sendResponse(res, 200, t("wishlist:product_added"), wishlist);
  }
);

export const removeProductFromWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const wishlist = await WishlistService.removeProductFromWishlist(
      req.user!._id.toString(),
      req.params.productId as string
    );
    sendResponse(res, 200, t("wishlist:product_removed"), wishlist);
  }
);

export const clearWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    await WishlistService.clearWishlist(req.user!._id.toString());
    sendResponse(res, 204, t("wishlist:cleared"));
  }
);