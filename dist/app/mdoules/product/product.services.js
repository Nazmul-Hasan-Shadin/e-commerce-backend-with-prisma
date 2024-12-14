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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const getAllProduct = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, isFlash, categoryName } = filters, filterData = __rest(filters, ["searchTerm", "isFlash", "categoryName"]);
    console.log(filters, "iam filters");
    console.log(categoryName, "iam category name");
    let category;
    if (categoryName) {
        category = yield prisma_1.default.category.findUnique({
            where: {
                id: categoryName,
            },
        });
    }
    console.log(category, "hi ima filna category lists bro ");
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            OR: ["name", "description"].map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        const filterCondition = Object.keys(filterData).map((key) => ({
            [key]: {
                equals: filterData[key],
            },
        }));
        andCondition.push(...filterCondition);
    }
    if (isFlash) {
        andCondition.push({
            isFlash: isFlash === "true",
        });
    }
    if (categoryName) {
        andCondition.push({
            category: {
                name: {
                    contains: category === null || category === void 0 ? void 0 : category.name,
                    mode: "insensitive",
                },
            },
        });
    }
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = yield prisma_1.default.product.findMany({
        where: whereCondition,
    });
    return result;
});
const getSingleProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findUniqueOrThrow({
        where: { id: productId },
        include: {
            review: {
                include: {
                    user: true,
                },
            },
        },
    });
    return result;
});
const getProductByShopId = (shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findMany({
        where: { shopId: shopId },
    });
    return result;
});
const createProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        req.body.images = req === null || req === void 0 ? void 0 : req.file.path;
    }
    console.log(req.body, "iam file");
    const result = yield prisma_1.default.product.create({
        data: req.body,
    });
    return result;
});
const updateProduct = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield prisma_1.default.product.update({
        where: { id: productId },
        data: payload,
    });
    return updatedProduct;
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.orderItem.deleteMany({
        where: { productId: productId },
    });
    yield prisma_1.default.review.deleteMany({
        where: { productId: productId },
    });
    yield prisma_1.default.product.delete({
        where: { id: productId },
    });
    return { message: "Product deleted successfully" };
});
exports.ProductServices = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getSingleProduct,
    getProductByShopId,
};
