"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../Auth/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.default)();
router.get("/", (0, auth_1.default)(client_1.Role.admin, client_1.Role.user, client_1.Role.vendor), user_controller_1.UserController.getCurrentUser);
router.post("/register", user_controller_1.UserController.createUserIntoDb);
exports.UserRoutes = router;
