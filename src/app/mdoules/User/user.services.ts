import { User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import bcrypt from "bcrypt";

const createUser = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const result = prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  return result;
};

const getUserByEmail = async (userInfo: any): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: userInfo.email,
    },
    include: {
      Order: true,
      shop: true,
      shopFollower: true,
    },
  });

  return user;
};
const getAllUser = async () => {
  const user = await prisma.user.findMany({});

  return user;
};

export const UserServices = {
  createUser,
  getUserByEmail,
  getAllUser,
};
