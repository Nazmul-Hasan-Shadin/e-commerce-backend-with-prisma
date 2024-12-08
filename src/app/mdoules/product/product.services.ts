import { Prisma, Product, User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import bcrypt from "bcrypt";
import { Request } from "express";
import { fileUpload } from "../../../utils/fileUploader";

const getAllProduct = async (filters: any) => {
  const { searchTerm, categoryName, ...filterData } = filters;

  const andCondition: Prisma.ProductWhereInput[] = [];
  if (searchTerm) {
    andCondition.push({
      OR: ["name", "description"].map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  console.log("start", filterData);

  if (Object.keys(filterData).length > 0) {
    console.log("iam entrdd");

    const filterCondition = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: filterData[key],
      },
    }));
    console.log(...filterCondition);

    andCondition.push(...filterCondition);
  }

  if (categoryName) {
    andCondition.push({
      category: {
        name: {
          contains: categoryName,
          mode: "insensitive",
        },
      },
    });
  }

  const whereCondition: Prisma.ProductWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.product.findMany({
    where: whereCondition,
  });

  console.log(result, "iam result");

  return result;
};

const getSingleProduct = async (productId: string) => {
  const result = await prisma.product.findUniqueOrThrow({
    where: { id: productId },
    include: {
      review: {
        include: {
          user: true,
        },
      },
    },
  });
  return result;
};

const getProductByShopId = async (shopId: string) => {
  const result = await prisma.product.findMany({
    where: { shopId: shopId },
  });
  return result;
};

const createProduct = async (req: Request) => {
  if (req.file) {
    req.body.images = req?.file.path;
  }

  console.log(req.body, "iam file");

  const result = await prisma.product.create({
    data: req.body,
  });

  return result;
};

const updateProduct = async (productId: string, payload: any) => {
  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: payload,
  });
  return updatedProduct;
};

const deleteProduct = async (productId: string) => {
  await prisma.orderItem.deleteMany({
    where: { productId: productId },
  });
  await prisma.review.deleteMany({
    where: { productId: productId },
  });

  await prisma.product.delete({
    where: { id: productId },
  });
  return { message: "Product deleted successfully" };
};

export const ProductServices = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  getProductByShopId,
};
