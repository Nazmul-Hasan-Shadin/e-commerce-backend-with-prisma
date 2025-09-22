import { Request } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

import { IAuthUser } from "../../../interface/common";
import AppError from "../../error/AppError";
import { MetaServices } from "./meta.services";

const getRoleMeta = catchAsync(async (req, res) => {
  const result = await MetaServices.fetchDashboardMetaData(req.user);

   sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Meta info retrieved in successful",
    data:result
  });
  });




export const MetaController = {
getRoleMeta
};
