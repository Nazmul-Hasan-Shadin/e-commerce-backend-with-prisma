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

const updateCategory = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;
  const { name, description } = req.body;

  const updatedCategory = await CategoryServices.updateCategory(categoryId, {
    name,
    description,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category updated successfully",
    data: updatedCategory,
  });
});

const deleteCategory = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;

  const result = await CategoryServices.deleteCategory(categoryId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  updateCategory,
  deleteCategory,
};
