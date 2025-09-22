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
const getAllProduct = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, brandFilter, isFlash, categoryName } = filters, filterData = __rest(filters, ["searchTerm", "brandFilter", "isFlash", "categoryName"]);
    //categoryName dea dropdown dea direct search kora jai
    console.log({ searchTerm, brandFilter, isFlash, categoryName, filterData });
    let brandFilterByArray = [];
    if (brandFilter) {
        brandFilterByArray = brandFilter.split(",");
    }
  
    let category;
    if (categoryName) {
        category = yield prisma_1.default.category.findUnique({
            where: {
                id: categoryName,
            },
        });
    }

    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            OR: ["name", "description"].map((field) => ({
                //[{OR:[{email:''}]}, {name:'shadin',eamil:'bul'}]
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    const filteredPureQuery = Object.assign({}, options);
    const excludePaginationParameterFromQuery = [
        "limit",
        "page",
        "orderBy",
        "sortBy",
        "categoryName",
        "brandFilter",
        "isFlash",
    ];
    for (const key of excludePaginationParameterFromQuery) {
        delete filteredPureQuery[key];
    }
    if (Object.keys(filteredPureQuery).length > 0) {
        const filterCondition = Object.keys(filteredPureQuery).map((key) => ({
            [key]: {
                equals: filteredPureQuery[key],
            },
        }));
        andCondition.push(...filterCondition);
    }
    if (isFlash) {
        andCondition.push({
            isFlash: isFlash === "true",
        });
    }
    if (brandFilterByArray.length > 0) {
        andCondition.push({
            category: {
                name: {
                    in: brandFilterByArray,
                },
            },
        });
    }
    if (categoryName && category) {
        andCondition.push({
            category: {
                id: categoryName, // Use categoryId to filter products
            },
        });
    }
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    //pagination options
    let limit = Number(options.limit) || 12;
    let page = Number(options.page) || 1;
    const result = yield prisma_1.default.product.findMany({
        where: whereCondition,
        include: {
            category: true,
        },
        skip: (page - 1) * limit,
        orderBy: options.sortBy && options.orderBy
            ? {
                [options.sortBy]: options.orderBy,
            }
            : {
                createdAt: "asc",
            },
        take: limit,
    });
    const total = yield prisma_1.default.product.count({ where: whereCondition });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
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
const getProductByShopId = (shopId, filterQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(filterQuery.limit) || 16;
    const page = Number(filterQuery.page) || 1;
    const result = yield prisma_1.default.product.findMany({
        where: { shopId: shopId },
        skip: (page - 1) / limit,
        take: limit,
    });
    const total = yield prisma_1.default.product.count({
        where: {
            shopId,
        },
    });
    return {
        meta: {
            limit,
            page,
            total
        },
        data: result
    };
});
const createProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files) {
        const imagePaths = Array.isArray(req.files)
            ? req.files.map((file) => file.path)
            : req.files
                ? [req.files.path]
                : [];
        req.body.images = imagePaths;
    }
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
