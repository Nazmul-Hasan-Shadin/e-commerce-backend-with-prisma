import { Prisma, Product, User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import bcrypt from "bcrypt";
import { Request } from "express";
import { fileUpload } from "../../../utils/fileUploader";

const getAllProduct = async (filters: any) => {
  const { searchTerm, categoryFilter, isFlash, categoryName, ...filterData } =
    filters;

  let categoryFilterArray = [];
  if (categoryFilter) {
    categoryFilterArray = categoryFilter.split(",");
  }

  let category;
  if (categoryName) {
    category = await prisma.category.findUnique({
      where: {
        id: categoryName,
      },
    });
  }

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

  if (Object.keys(filterData).length > 0) {
    const filterCondition = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: filterData[key],
      },
    }));

    andCondition.push(...filterCondition);
  }

  if (isFlash) {
    andCondition.push({
      isFlash: isFlash === "true",
    });
  }

  if (categoryFilterArray.length > 0) {
    andCondition.push({
      category: {
        name: {
          in: categoryFilterArray,
        },
      },
    });
  }
  if (categoryName && category) {
    andCondition.push({
      category: {
        id: category.id, // Use categoryId to filter products
      },
    });
  }

  const whereCondition: Prisma.ProductWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.product.findMany({
    where: whereCondition,
    include: {
      category: true,
    },
  });

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
  console.log(req.file, "iam file bro");
  console.log(req.files, "iam files bro");

  if (req.files) {
    const imagePaths = Array.isArray(req.files)
      ? req.files.map((file: any) => file.path)
      : req.files
      ? [req.files.path]
      : [];
    req.body.images = imagePaths;
  }

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
