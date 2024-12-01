import express from "express";
import { UserRoutes } from "../mdoules/User/user.route";
import { AuthRoutes } from "../mdoules/Auth/auth.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/register",
    route: UserRoutes,
  },
  {
    path: "/user",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
