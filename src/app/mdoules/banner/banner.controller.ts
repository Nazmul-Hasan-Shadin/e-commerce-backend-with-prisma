import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { BannerServices } from "./banner.services";

export const createBanner = catchAsync(async (req, res, next) => {
  if (req.file) {
    const path = req.file.path;
    req.body.data = JSON.parse(req.body.data);
    req.body.data.image = path;
  }

  const result = await BannerServices.createBannerIntoDb(req.body.data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Banner created successful",
    data: result,
  });
});

export const getBannerFromDb = catchAsync(async (req, res, next) => {
  const result = await BannerServices.getBannerFromDb();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Banner retrieved successful",
    data: result,
  });
});
export const updateBannerIntoDb = catchAsync(async (req, res, next) => {
  if (req.file) {
    const path = req.file.path;
    req.body.data = JSON.parse(req.body.data);
    req.body.data.image = path;
  }

  const result = await BannerServices.updateBannerIntoDb(req.body.data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Banner created successful",
    data: result,
  });
});
export const BannerController = {
  createBanner,
  getBannerFromDb,
  updateBannerIntoDb
};
