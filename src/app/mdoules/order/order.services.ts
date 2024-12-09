import { IAuthUser } from "../../../interface/common";
import prisma from "../../../utils/prisma";

const createOrder = async (payload: any) => {
  const { shopId, customerId, totalAmount, orderItems } = payload;

  // Create the order and associated order items
  const order = await prisma.order.create({
    data: {
      shopId,
      customerId,
      totalAmount,
      orderItems: {
        create: orderItems.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      orderItems: true,
    },
  });

  return order;
};

const getAllOrdersFromDB = async (user: IAuthUser) => {
  let result;

  if (user.role === "vendor") {
    result = await prisma.order.findMany({
      where: {
        shop: {
          vendor: {
            email: user.email,
          },
        },
      },

      include: {
        shop: true,
        customer: true,
        orderItems: {
          include: {
            product: true,
            order: {
              include: {
                orderItems: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (user.role === "admin") {
    result = await prisma.order.findMany({
      include: {
        shop: true,
        customer: true,
        orderItems: {
          include: {
            product: {
              include: {
                OrderItems: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (user.role === "user") {
    result = await prisma.order.findMany({
      where: {
        customer: {
          email: user.email,
        },
      },

      include: {
        shop: true,
        customer: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return result;
};

const getOrderById = async (orderId: string) => {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      shop: true,
      customer: true,
    },
  });

  return order;
};

// const updateOrderStatus = async (orderId: string, status: string) => {
//   const updatedOrder = await prisma.order.update({
//     where: { id: orderId },
//     data: { status },
//   });

//   return updatedOrder;
// };

// const deleteOrder = async (orderId: string) => {
//   await prisma.order.delete({
//     where: { id: orderId },
//   });

//   return { message: "Order deleted successfully" };
// };

export const OrderServices = {
  createOrder,
  getOrderById,
  getAllOrdersFromDB,
  //   updateOrderStatus,
  //   deleteOrder,
};
