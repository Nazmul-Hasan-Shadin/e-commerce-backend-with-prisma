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
const fileUploader_1 = require("../../../utils/fileUploader");
const router = (0, express_1.default)();
router.get("/:id", shop_controller_1.ShopController.shopById);
router.post("/create-shop", fileUploader_1.fileUpload.multerUpload.single("file"), (0, auth_1.default)(client_1.Role.vendor, client_1.Role.admin), (req, res, next) => {
    (req.body = JSON.parse(req.body.data)),
        shop_controller_1.ShopController.createShop(req, res, next);
});
exports.ShopRoutes = router;
