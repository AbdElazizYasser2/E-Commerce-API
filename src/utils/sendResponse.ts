import { Response } from "express";

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T | null = null
): Response => {
  const response: { success: boolean; message: string; data?: T } = {
    success: true,
    message,
  };

  if (data !== null) response.data = data;

  return res.status(statusCode).json(response);
};

export default sendResponse;