"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopRoutes = void 0;
const express_1 = __importDefault(require("express"));
const shop_controller_1 = require("./shop.controller");
const auth_1 = __importDefault(require("../Auth/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.default)();
router.post('/create-shop', (0, auth_1.default)(client_1.Role.vendor), shop_controller_1.ShopController.createShop);
exports.ShopRoutes = router;
