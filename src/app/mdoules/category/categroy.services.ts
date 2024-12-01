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

export const CategoryServices = {
  createCategory,
};
