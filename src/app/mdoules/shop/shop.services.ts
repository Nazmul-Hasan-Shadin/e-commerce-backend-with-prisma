import { Shop } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { Request } from "express";

const createShop = async (req: Request) => {
  if (req.file) {
    req.body.logo = req?.file.path;
  }

  const newShop: Shop = await prisma.shop.create({
    data: req.body,
    include: {
      vendor: true,
    },
  });
  return newShop;
};

const getShopById = async (shopId: string) => {
  const result = await prisma.shop.findUnique({
    where: {
      id: shopId,
    },
    include: {
      shopFollower: true,
    },
  });
  return result;
};
export const shopServices = {
  createShop,
  getShopById,
};
