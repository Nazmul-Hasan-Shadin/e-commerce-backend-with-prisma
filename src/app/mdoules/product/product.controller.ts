import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ProductServices } from "./product.services";

const createProductIntoDb = catchAsync(async (req, res, next) => {
  const result = await ProductServices.createProduct(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product is created succesful",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const result = await ProductServices.updateProduct(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const result = await ProductServices.deleteProduct(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: result,
  });
});

export const ProductController = {
  createProductIntoDb,
  updateProduct,
  deleteProduct,
};
