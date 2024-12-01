import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthServices } from "../Auth/auth.services";
import { CategoryServices } from "./categroy.services";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategory(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category is created succesful",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
};
