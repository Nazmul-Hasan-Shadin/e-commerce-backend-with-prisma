import { Shop } from "@prisma/client";
import prisma from "../../../utils/prisma";

const createShop = async (payload: {
  name: string;
  logo: string;
  description: string;
  vendorId: string;
}) => {
  const newShop: Shop = await prisma.shop.create({
    data: {
      name: payload.name,
      logoUrl: payload.logo,
      description: payload.description,
      vendorId: payload.vendorId,
    },
    include: {
      vendor: true,
    },
  });
  return newShop;
};

export const shopServices = {
  createShop,
};
