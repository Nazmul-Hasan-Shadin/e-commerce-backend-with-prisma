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
exports.FollowerServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const followShop = (user, shopId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existingUser = yield prisma_1.default.user.findUnique({
        where: {
            email: user.email,
        },
        include: {
            shopFollower: true,
        },
    });
    console.log(existingUser, "iedfjdkfjkd");
    if (!existingUser) {
        throw new Error("User not found");
    }
    const alreadyFollowing = (_a = existingUser.shopFollower) === null || _a === void 0 ? void 0 : _a.some((follower) => follower.shopId === shopId);
    if (alreadyFollowing) {
        throw new Error("User already follows this shop");
    }
    return prisma_1.default.shopFollower.create({
        data: {
            userId: existingUser.id,
            shopId,
        },
    });
});
const unfollowShop = (user, shopId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const existingUser = yield prisma_1.default.user.findUnique({
        where: {
            email: user.email,
        },
        include: {
            shopFollower: true,
        },
    });
    if (!existingUser) {
        throw new Error("User not found");
    }
    const userId = existingUser === null || existingUser === void 0 ? void 0 : existingUser.id;
    if (existingUser.role !== "user") {
        throw new Error("Only users can unfollow shops");
    }
    const followerRecord = (_b = existingUser.shopFollower) === null || _b === void 0 ? void 0 : _b.find((follower) => follower.shopId === shopId);
    if (!followerRecord) {
        throw new Error("User does not follow this shop");
    }
    return prisma_1.default.shopFollower.delete({
        where: {
            userId_shopId: {
                userId,
                shopId,
            },
        },
    });
});
exports.FollowerServices = {
    unfollowShop,
    followShop,
};
