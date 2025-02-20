import { NextFunction, Request, Response } from "express";

const globlaErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    success: false,
    message: err.message || "something went wrong",
    error: err,
  });
};

export default globlaErrorHandler;
