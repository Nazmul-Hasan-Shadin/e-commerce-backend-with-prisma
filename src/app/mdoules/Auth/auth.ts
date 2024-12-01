import { NextFunction, Request, Response } from "express";

import { Secret } from "jsonwebtoken";
import AppError from "../../error/AppError";
import config from "../../../config";
import { jwtHelpers } from "../../../utils/jwtUtils";



const auth = (...roles: string[]) => {
  return async (req: Request & {user?:any}, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(404, "you are unauthorized");
      }
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as string
      );

      req.user=verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new AppError(404, "Yuu are not authorized");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
