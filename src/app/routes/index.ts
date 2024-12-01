import express from "express";
import { UserRoutes } from "../mdoules/User/user.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/register",
    route: UserRoutes
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
