import asyncHandler from 'express-async-handler';
import { Request, Response } from "express";
import * as ProductService from './product.service.ts';
import sendResponse from "../../utils/sendResponse.ts";
import { t } from "../../utils/translate.ts";

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ProductService.getAllProducts(req.query as any);
    sendResponse(res, 200, t("product:all_fetched"), result);
  }
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await ProductService.getProductById(req.params.id as string);
    sendResponse(res, 200, t("product:fetched"), product);
  }
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await ProductService.createProduct(req.body);
    sendResponse(res, 201, t("product:created"), product);
  }
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await ProductService.updateProduct(
      req.params.id as string,
      req.body
    );
    sendResponse(res, 200, t("product:updated"), product);
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    await ProductService.deleteProduct(req.params.id as string);
    sendResponse(res, 204, t("product:deleted"));
  }
);

export const getProductsByCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ProductService.getProductsByCategory(
      req.params.categoryId as string,
      req.query as any
    );
    sendResponse(res, 200, t("product:by_category_fetched"), result);
  }
);

export const getProductsByBrand = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ProductService.getProductsByBrand(
      req.params.brandId as string,
      req.query as any
    );
    sendResponse(res, 200, t("product:by_brand_fetched"), result);
  }
);