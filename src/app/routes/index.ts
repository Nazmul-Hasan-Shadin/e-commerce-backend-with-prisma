import express from "express";
import { UserRoutes } from "../mdoules/User/user.route";
import { AuthRoutes } from "../mdoules/Auth/auth.route";
import { CategoryRoutes } from "../mdoules/category/category.route";
import { ProductRoutes } from "../mdoules/product/product.route";
import { ShopRoutes } from "../mdoules/shop/shop.route";
import { OrderRoutes } from "../mdoules/order/order.route";
import { ReviewRoutes } from "../mdoules/review/review.route";
import { FollowerRoutes } from "../mdoules/ShopFollow/shopFollow.route";
import { PaymentRoutes } from "../mdoules/payment/payment.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
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
    path: "/shop",
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
  {
    path: "/shop",
    route: FollowerRoutes,
  },
  {
    path: "",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
