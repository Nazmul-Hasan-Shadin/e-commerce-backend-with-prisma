import { Role } from "@prisma/client";
import { IAuthUser } from "../../../interface/common";
import prisma from "../../../utils/prisma";
import AppError from "../../error/AppError";

const fetchDashboardMetaData = async (user: IAuthUser) => {
  switch (user.role) {
    case Role.admin:
      getAdminMetaData(user);
      break;
    case Role.vendor:
      getVendorMetaData(user);
      break;
    default:
      throw new AppError(404, "invalid role");
  }
};

const getAdminMetaData = async (user: IAuthUser) => {
  const vendorCount = await prisma.user.count({
    where: {
      role: "vendor",
    },
  });
  const userCount = await prisma.user.count({});
  const totalRevenu = await prisma.order.aggregate({
    _sum: {
      totalAmount: true,
    },
  });
};

const getVendorMetaData = async (user: IAuthUser) => {
  const orderCount = await prisma.order.count({
    where: {
      shop: {
        vendor: {
          email: user.email,
        },
      },
    },
  });

  const totalRevenu = await prisma.order.aggregate({
    _sum: {
      totalAmount: true,
    },
    where: {
      shop: {
        vendor: {
          email: user.email,
        },
      },
    },
  });

  const productCount = await prisma.product.aggregate({
    where: {
      shop: {
        vendor: {
          email: user.email,
        },
      },
    },
  });
};

// const getUserMetaData = async (user: IAuthUser) => {
//   const vendorCount = await prisma.user.count({
//     where: {
//       role: "vendor",
//     },
//   });
//   const userCount = await prisma.user.count({});
//   const totalRevenu = await prisma.order.aggregate({
//     _sum: {
//       totalAmount: true,
//     },
//   });
// };

export const MetaServices={
  fetchDashboardMetaData
}