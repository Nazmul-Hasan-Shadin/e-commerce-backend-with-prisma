import { Request } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthServices } from "../Auth/auth.services";
import { UserServices } from "./user.services";
import { IAuthUser } from "../../../interface/common";

const createUserIntoDb = catchAsync(async (req, res) => {
  const result = await UserServices.createUser(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "users are created succesful",
    data: result,
  });
});

const getCurrentUser = catchAsync(async (req, res) => {
  const result = await UserServices.getUserByEmail(req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "users is fetched succesful",
    data: result,
  });
});

export const UserController = {
  createUserIntoDb,
  getCurrentUser,
};
