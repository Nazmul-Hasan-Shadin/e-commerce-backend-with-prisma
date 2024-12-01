import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ProductServices } from "./product.services";

const createProductIntoDb = catchAsync(async (req, res, next) => {


  const result = await ProductServices.createProduct(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product is created succesful",
    data:result,
  });
});

export const ProductController = {
  createProductIntoDb,
};
