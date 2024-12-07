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

const getAllProduct = catchAsync(async (req, res, next) => {
  console.log(req.body, "iam body");

  const result = await ProductServices.getAllProduct(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product are fetch succesful",
    data: result,
  });
});
const getSingleProduct = catchAsync(async (req, res, next) => {
  const result = await ProductServices.getSingleProduct(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product retrived successfully",
    data: result,
  });
});

const getProductByShopId = catchAsync(async (req, res, next) => {
  const result = await ProductServices.getProductByShopId(req.params.shopId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product are retrived successfully",
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
  getSingleProduct,
  getAllProduct,
  getProductByShopId,
};
