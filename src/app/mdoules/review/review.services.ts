import prisma from "../../../utils/prisma";

const addReview = async (payload: {
  productId: string;
  userId: string;
  rating: number;
  comment?: string;
}) => {
  const review = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      productId: payload.productId,
      userId: payload.userId,
    },
  });
  return review;
};

const getReviewWithProductDetails = async (id: string) => {
  const result = await prisma.review.findMany({
    where: {
      productId: id,
    },
    include: {
      product: true,
    },
  });
  return result;
};

const getMyReview = async (userInfo: any,options) => {

  let page = Number(options.page) || 1;
  let limit =Number(options.limit) || 4;
  let skip = (page - 1) * limit;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: userInfo.email,
    },
  });

  const result = await prisma.review.findMany({
    where: {
      userId: user.id,
    },
    include: {
      product: true,
    },
    skip: skip,
    take: limit,
  });
 const total= await prisma.review.count({
  where:{
      userId: user.id,
  }
 })

  return {
    meta:{
      total,
      limit,
      page,
       totalPages: Math.ceil(total / limit),

    },
    data:result
  };
};

export const ReviewServices = {
  addReview,
  getReviewWithProductDetails,
  getMyReview,
};
