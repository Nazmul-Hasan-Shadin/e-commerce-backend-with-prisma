import { User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import bcrypt from "bcrypt";

const createCategory = async (payload: any) => {
  const result = prisma.category.create({
    data: {
      ...payload,
    },
  });

  return result;
};

const updateCategory = async (categoryId: string, data: { name: string; description: string }) => {
  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data,
  });

  return updatedCategory;
};

const deleteCategory = async (categoryId: string) => {
  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  return { message: "Category deleted successfully" };
};

export const CategoryServices = {
  createCategory,
  updateCategory,
  deleteCategory
};
