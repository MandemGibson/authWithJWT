import { NextFunction, Request, Response } from "express";

export async function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({ message: error.message });
  next();
}
