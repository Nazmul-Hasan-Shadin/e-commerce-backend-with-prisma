import { Role } from "@prisma/client";
import prisma from "../src/utils/prisma";

const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: Role.admin,
      },
    });
    const superAdminData = await prisma.user.create({
      data: {
        email: "super@admin.com",
        password: "admin",
        role: Role.admin,
        username: "superadmin",
        userData: {
          create: {
            firstName: "Nazmul Hasan",
            lastName: "Shadin",
            gender: "male",
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

seedSuperAdmin();
