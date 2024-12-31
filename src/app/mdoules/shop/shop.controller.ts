import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthServices } from "../Auth/auth.services";
import { shopServices } from "./shop.services";

const createShop = catchAsync(async (req, res) => {
  const result = await shopServices.createShop(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "shop is created succesful",
    data: result,
  });
});

const shopById = catchAsync(async (req, res) => {
  const result = await shopServices.getShopById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "shop is retrived succesful",
    data: result,
  });
});
const getTopTenShop = catchAsync(async (req, res) => {
  const result = await shopServices.getTopTenShop();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "shop are retrived succesful",
    data: result,
  });
});
export const ShopController = {
  createShop,
  shopById,
  getTopTenShop,
};
