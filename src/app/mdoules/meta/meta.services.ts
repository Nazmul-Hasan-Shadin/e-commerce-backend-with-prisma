import { Role } from "@prisma/client";
import { IAuthUser } from "../../../interface/common";
import prisma from "../../../utils/prisma";
import AppError from "../../error/AppError";

const fetchDashboardMetaData = async (user: IAuthUser) => {
  switch (user.role) {
    case Role.admin:
    return  getAdminMetaData(user);
      break;
    case Role.vendor:
   return   getVendorMetaData(user);
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
  return {
    vendorCount,userCount,totalRevenu
  }
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

    const totalReview = await prisma.review.count({

    where: {
       product:{
        shop:{
            vendor:{
                email:user.email
            }
        }
       }
    },
  });

  const productCount = await prisma.product.count({

    where: {
      shop: {
        vendor: {
          email: user.email,
        },
      },
    },
  });

//   console.log( {orderCount,totalRevenu,totalReview,productCount});
  

  return {orderCount,totalRevenu,totalReview,productCount}
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