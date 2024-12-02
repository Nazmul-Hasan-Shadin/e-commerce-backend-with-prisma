import express from "express";
import { UserRoutes } from "../mdoules/User/user.route";
import { AuthRoutes } from "../mdoules/Auth/auth.route";
import { CategoryRoutes } from "../mdoules/category/category.route";
import { ProductRoutes } from "../mdoules/product/product.route";
import { ShopRoutes } from "../mdoules/shop/shop.route";
import { OrderRoutes } from "../mdoules/order/order.route";
import { ReviewRoutes } from "../mdoules/review/review.route";

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
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/",
    route: ShopRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
