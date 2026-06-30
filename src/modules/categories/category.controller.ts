import asyncHandler from 'express-async-handler';
import { Request, Response } from "express";
import * as CategoryService from './category.service.ts';
import sendResponse from "../../utils/sendResponse.ts";
import { t } from "../../utils/translate.ts";

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategories(req.query as any);
    sendResponse(res, 200, t("category:all_fetched"), result);
  }
);

export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await CategoryService.getCategoryById(req.params.id as string);
    sendResponse(res, 200, t("category:fetched"), category);
  }
);

export const getSubcategories = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getSubcategories(req.params.id as string);
    sendResponse(res, 200, t("category:subcategories_fetched"), result);
  }
);

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await CategoryService.createCategory(req.body);
    sendResponse(res, 201, t("category:created"), category);
  }
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await CategoryService.updateCategory(
      req.params.id as string,
      req.body
    );
    sendResponse(res, 200, t("category:updated"), category);
  }
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    await CategoryService.deleteCategory(req.params.id as string);
    sendResponse(res, 204, t("category:deleted"));
  }
);