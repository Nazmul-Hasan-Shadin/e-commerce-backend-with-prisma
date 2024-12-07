import { Product, User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import bcrypt from "bcrypt";
import { Request } from "express";
import { fileUpload } from "../../../utils/fileUploader";

const getAllProduct = async (req: Request) => {
  const result = await prisma.product.findMany();

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
