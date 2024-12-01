import express from "express";
import { AuthController } from "./auth.controller";
import auth from "./auth";
import { Role } from "@prisma/client";

const router = express.Router();

router.post("/login",  AuthController.loginUser);
router.post("/change-password", auth(Role.user,Role.admin,Role.vendor), AuthController.changePassword);

export const AuthRoutes = router;
