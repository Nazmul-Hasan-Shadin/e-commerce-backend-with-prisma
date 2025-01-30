import express from "express";
import { UserController } from "./user.controller";
import auth from "../Auth/auth";
import { Role } from "@prisma/client";

const router = express();

router.get(
  "/",
  auth(Role.admin, Role.user, Role.vendor),
  UserController.getCurrentUser
);
router.get(
  "/all-user",

  UserController.getallUser
);
router.post("/register", UserController.createUserIntoDb);

export const UserRoutes = router;
