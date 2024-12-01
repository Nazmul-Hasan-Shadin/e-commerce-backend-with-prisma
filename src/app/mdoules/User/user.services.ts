import { User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import bcrypt from "bcrypt";

const createUser = async (payload:any) => {
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

export const UserServices = {
  createUser,
};
