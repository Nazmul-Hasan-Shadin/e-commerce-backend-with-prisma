"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const createShop = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        req.body.logo = req === null || req === void 0 ? void 0 : req.file.path;
    }
    const newShop = yield prisma_1.default.shop.create({
        data: req.body,
        include: {
            vendor: true,
        },
    });
    return newShop;
});
const getTopTenShop = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.shop.findMany({});
    return result;
});
const getShopById = (shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.shop.findUnique({
        where: {
            id: shopId,
        },
        include: {
            shopFollower: true,
        },
    });
    return result;
});
exports.shopServices = {
    createShop,
    getShopById,
    getTopTenShop,
};
