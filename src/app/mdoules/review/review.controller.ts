import { Request } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

import { IAuthUser } from "../../../interface/common";
import prisma from "../../../utils/prisma";
import { ReviewServices } from "./review.services";
import { ProductServices } from "../product/product.services";

const addReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.addReview(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

const getProductWithReview = catchAsync(async (req, res, next) => {
  const { productId } = req.params; // Get productId from URL params

  const product = await ReviewServices.getReviewWithProductDetails(productId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product details with reviews retrieved successfully",
    data: product,
  });
});

export const ReviewController = {
  addReview,
  getProductWithReview,
};
