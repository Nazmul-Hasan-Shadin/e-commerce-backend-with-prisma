import { User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import bcrypt from "bcrypt";

const createUser = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);
  console.log(hashedPassword);

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

  console.log("sir ", user);

  return user;
};

export const UserServices = {
  createUser,
  getUserByEmail,
};
