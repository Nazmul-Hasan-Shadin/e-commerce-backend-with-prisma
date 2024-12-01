import { UserStatus } from "@prisma/client";
import config from "../../../config";
import { generateToken } from "../../../utils/jwtUtils";
import prisma from "../../../utils/prisma";
import bcrypt from "bcrypt";

const loginUser = async (payload: { email: string; password: string }) => {
  console.log(payload);
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.active,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("password is incorrecct");
  }

  const accessToken = generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.jwt_secret as string,
    config.jwt.expires_in as string
  );

  const refreshtoken = generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.refreshToken_sec as string,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshtoken,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("password is incorrecct");
  }

  const hashPassword: string = await bcrypt.hash(payload.newPassword,12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashPassword,
    },
  });

  return {
    message: "password changed successfully",
  };
};

export const AuthServices = {
  loginUser,
  changePassword
};
