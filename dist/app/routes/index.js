"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../mdoules/User/user.route");
const auth_route_1 = require("../mdoules/Auth/auth.route");
const category_route_1 = require("../mdoules/category/category.route");
const product_route_1 = require("../mdoules/product/product.route");
const shop_route_1 = require("../mdoules/shop/shop.route");
const order_route_1 = require("../mdoules/order/order.route");
const review_route_1 = require("../mdoules/review/review.route");
const shopFollow_route_1 = require("../mdoules/ShopFollow/shopFollow.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/register",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/user",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/category",
        route: category_route_1.CategoryRoutes,
    },
    {
        path: "/product",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/",
        route: shop_route_1.ShopRoutes,
    },
    {
        path: "/order",
        route: order_route_1.OrderRoutes,
    },
    {
        path: "/review",
        route: review_route_1.ReviewRoutes,
    },
    {
        path: "/shop",
        route: shopFollow_route_1.FollowerRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
