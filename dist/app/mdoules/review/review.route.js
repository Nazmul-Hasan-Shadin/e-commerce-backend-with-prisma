"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../Auth/auth"));
const client_1 = require("@prisma/client");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.Role.user, client_1.Role.admin, client_1.Role.vendor), review_controller_1.ReviewController.addReview);
router.get("/:productId", review_controller_1.ReviewController.getProductWithReview);
exports.ReviewRoutes = router;
