"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const auth_1 = __importDefault(require("../Auth/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.default)();
router.post('/create-category', (0, auth_1.default)(client_1.Role.admin), category_controller_1.CategoryController.createCategory);
router.put("/:categoryId", category_controller_1.CategoryController.updateCategory);
router.delete("/:categoryId", category_controller_1.CategoryController.deleteCategory);
exports.CategoryRoutes = router;
