import asyncHandler from 'express-async-handler';
import { Request, Response } from "express";
import * as BrandService from './brand.service.ts';
import sendResponse from "../../utils/sendResponse.ts";
import { t } from "../../utils/translate.ts";

export const getAllBrands = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await BrandService.getAllBrands(req.query as any);
    sendResponse(res, 200, t("brand:all_fetched"), result);
  }
);

export const getBrandById = asyncHandler(
  async (req: Request, res: Response) => {
    const brand = await BrandService.getBrandById(req.params.id as string);
    sendResponse(res, 200, t("brand:fetched"), brand);
  }
);

export const createBrand = asyncHandler(
  async (req: Request, res: Response) => {
    const brand = await BrandService.createBrand(req.body);
    sendResponse(res, 201, t("brand:created"), brand);
  }
);

export const updateBrand = asyncHandler(
  async (req: Request, res: Response) => {
    const brand = await BrandService.updateBrand(
      req.params.id as string,
      req.body
    );
    sendResponse(res, 200, t("brand:updated"), brand);
  }
);

export const deleteBrand = asyncHandler(
  async (req: Request, res: Response) => {
    await BrandService.deleteBrand(req.params.id as string);
    sendResponse(res, 204, t("brand:deleted"));
  }
);