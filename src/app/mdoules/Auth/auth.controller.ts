import { Request } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthServices } from "./auth.services";
import { IAuthUser } from "../../../interface/common";
import AppError from "../../error/AppError";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshtoken } = result;

  res.cookie("refreshToken", refreshtoken, {
    secure: false,
    httpOnly: true,

    // domain: "e-commerce-inky-alpha.vercel.app",
    // path: "/",
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "logged in successful",
    data: {
      accessToken: result.accessToken,
    },
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: IAuthUser }, res) => {
    const user = req.user;

    const result = await AuthServices.changePassword(user, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "password change successful",
      data: result,
    });
  }
);
const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgetPassword(req.body.email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reset token is retrieved successfully",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.query.token;

  const result = await AuthServices.resetPassword(req.body, token);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword,
};
