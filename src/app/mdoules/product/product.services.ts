import { Prisma, Product, User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import bcrypt from "bcrypt";
import { Request } from "express";
import { fileUpload } from "../../../utils/fileUploader";

interface IFilterQuery {
  limit: number;
  page: number;
}

const getAllProduct = async (filters: any, options: any) => {
  const { searchTerm, brandFilter, isFlash, categoryName, ...filterData } =
    filters;
  //categoryName dea dropdown dea direct search kora jai
  console.log({ searchTerm, brandFilter, isFlash, categoryName, filterData });

  let brandFilterByArray = [];
  if (brandFilter) {
    brandFilterByArray = brandFilter.split(",");
  }
  console.log(brandFilterByArray);

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
        //[{OR:[{email:''}]}, {name:'shadin',eamil:'bul'}]
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  const filteredPureQuery = {
    ...options,
  };

  const excludePaginationParameterFromQuery: string[] = [
    "limit",
    "page",
    "orderBy",
    "sortBy",
    "categoryName",
    "brandFilter",
    "isFlash",
  ];

  for (const key of excludePaginationParameterFromQuery) {
    delete filteredPureQuery[key];
  }

  if (Object.keys(filteredPureQuery).length > 0) {
    const filterCondition = Object.keys(filteredPureQuery).map((key) => ({
      [key]: {
        equals: filteredPureQuery[key],
      },
    }));

    andCondition.push(...filterCondition);
  }

  if (isFlash) {
    andCondition.push({
      isFlash: isFlash === "true",
    });
  }

  if (brandFilterByArray.length > 0) {
    andCondition.push({
      category: {
        name: {
          in: brandFilterByArray,
        },
      },
    });
  }
  if (categoryName && category) {
    andCondition.push({
      category: {
        id: categoryName, // Use categoryId to filter products
      },
    });
  }

  const whereCondition: Prisma.ProductWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  //pagination options
  let limit = Number(options.limit) || 12;
  let page = Number(options.page) || 1;

  const result = await prisma.product.findMany({
    where: whereCondition,
    include: {
      category: true,
    },
    skip: (page - 1) * limit,
    orderBy:
      options.sortBy && options.orderBy
        ? {
            [options.sortBy]: options.orderBy,
          }
        : {
            createdAt: "asc",
          },
    take: limit,
  });
  const total = await prisma.product.count({ where: whereCondition });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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

const getProductByShopId = async (
  shopId: string,
  filterQuery: Record<string, unknown>
) => {
  const limit = Number(filterQuery.limit) || 16;
  const page = Number(filterQuery.page) || 1;

  const result = await prisma.product.findMany({
    where: { shopId: shopId },
    skip: (page - 1) / limit,
    take: limit,
  });
  const total = await prisma.product.count({
    where: {
      shopId,
    },
  });
  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  };
};

const createProduct = async (req: Request) => {
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

const increaseViewCount = async (
  productId: string,
  userInfo: any,
  ip: string,
  userAgent: string
) => {
  console.log({ productId, userInfo, ip, userAgent });
  const productExists = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!productExists) {
    throw new Error("Product not found");
  }
  if (Object.keys(userInfo).length > 0 && userInfo.email) {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: userInfo.email,
      },
    });
    const alreadyView = await prisma.productView.findUnique({
      where: {
        productId_userId: {
          productId,
          userId: user.id,
        },
      },
    });
    if (!alreadyView) {
      await prisma.productView.create({
        data: {
          userId: user.id,
          productId: productId,
        },
      });
      await prisma.product.update({
        where: { id: productId },
        data: { viewCount: { increment: 1 } },
      });
    }

    if (ip && userAgent) {
      const recentView = await prisma.productView.findFirst({
        where: {
          productId,
          ip,
          userAgent,
          createdAt: {
            gte: new Date(Date.now() - 1000 * 60 * 60),
          },
        },
      });

      if (!recentView) {
        await prisma.productView.create({
          data: {
            productId,
            userAgent,
            ip,
          },
        });

        await prisma.product.update({
          where: {
            id: productId,
          },
          data: {
            viewCount: {
              increment: 1,
            },
          },
        });
      }
    }
    return;
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  });
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
  increaseViewCount,
};
