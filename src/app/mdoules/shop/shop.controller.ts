import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthServices } from "../Auth/auth.services";
import { shopServices } from "./shop.services";

const createShop = catchAsync(async (req, res) => {
  const result = await shopServices.createShop(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "shop is created succesful",
    data: result,
  });
});

export const ShopController = {
  createShop,
};
