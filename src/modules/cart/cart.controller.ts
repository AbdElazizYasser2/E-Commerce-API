import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as CartService from "./cart.service.ts";
import sendResponse from "../../utils/sendResponse.ts";
import { t } from "../../utils/translate.ts";

export const getCart = asyncHandler(
  async (req: Request, res: Response) => {
    const cart = await CartService.getCart(req.user!._id.toString());
    sendResponse(res, 200, t("cart:fetched"), cart);
  }
);

export const addItemToCart = asyncHandler(
  async (req: Request, res: Response) => {
    const cart = await CartService.addItemToCart(
      req.user!._id.toString(),
      req.body
    );
    sendResponse(res, 200, t("cart:item_added"), cart);
  }
);

export const updateCartItemQuantity = asyncHandler(
  async (req: Request, res: Response) => {
    const cart = await CartService.updateCartItemQuantity(
      req.user!._id.toString(),
      req.params.itemId as string,
      req.body.quantity
    );
    sendResponse(res, 200, t("cart:item_updated"), cart);
  }
);

export const removeItemFromCart = asyncHandler(
  async (req: Request, res: Response) => {
    const cart = await CartService.removeItemFromCart(
      req.user!._id.toString(),
      req.params.itemId as string
    );
    sendResponse(res, 200, t("cart:item_removed"), cart);
  }
);

export const clearCart = asyncHandler(
  async (req: Request, res: Response) => {
    await CartService.clearCart(req.user!._id.toString());
    sendResponse(res, 204, t("cart:cleared"));
  }
);

export const applyCoupon = asyncHandler(
  async (req: Request, res: Response) => {
    const cart = await CartService.applyCoupon(
      req.user!._id.toString(),
      req.body.discount
    );
    sendResponse(res, 200, t("cart:coupon_applied"), cart);
  }
);