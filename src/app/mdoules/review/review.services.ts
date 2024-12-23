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

export const ReviewServices = {
  addReview,
  getReviewWithProductDetails,
};
