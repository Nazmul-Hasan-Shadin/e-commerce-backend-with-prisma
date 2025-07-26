import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { BannerServices } from "./banner.services";

export const createBanner = catchAsync(async (req, res, next) => {
  const result = await BannerServices.createBannerIntoDb(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Banner created successful",
    data: result,
  });
});

export const BannerController={
    createBanner
}