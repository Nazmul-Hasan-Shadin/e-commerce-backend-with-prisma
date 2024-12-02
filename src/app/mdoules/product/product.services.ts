import { Product, User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import bcrypt from "bcrypt";
import { Request } from "express";
import { fileUpload } from "../../../utils/fileUploader";

const createProduct = async (req:Request) => {



    if (req.file) {
        const uploadedProfileImage = await fileUpload.uploadToCloudinary(req.file);
        req.body.images = uploadedProfileImage?.secure_url;
      }
    
 console.log(req.body,'iam bod');
 
  const result = await prisma.product.create({
    data: req.body
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
  deleteProduct
};
