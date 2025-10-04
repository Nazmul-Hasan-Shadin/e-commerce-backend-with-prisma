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
exports.ReviewServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const addReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield prisma_1.default.review.create({
        data: {
            rating: payload.rating,
            comment: payload.comment,
            productId: payload.productId,
            userId: payload.userId,
        },
    });
    return review;
});
const getReviewWithProductDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({
        where: {
            productId: id,
        },
        include: {
            product: true,
        },
    });
    return result;
});
const getMyReview = (userInfo, options) => __awaiter(void 0, void 0, void 0, function* () {
    let page = Number(options.page) || 1;
    let limit = Number(options.limit) || 4;
    let skip = (page - 1) * limit;
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: userInfo.email,
        },
    });
    const result = yield prisma_1.default.review.findMany({
        where: {
            userId: user.id,
        },
        include: {
            product: true,
        },
        skip: skip,
        take: limit,
    });
    const total = yield prisma_1.default.review.count({
        where: {
            userId: user.id,
        }
    });
    return {
        meta: {
            total,
            limit,
            page,
            totalPages: Math.ceil(total / limit),
        },
        data: result
    };
});
exports.ReviewServices = {
    addReview,
    getReviewWithProductDetails,
    getMyReview,
};
