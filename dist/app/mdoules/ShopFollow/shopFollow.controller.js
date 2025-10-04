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
exports.FollowerController = exports.unfollowShop = exports.checkFollowValidity = exports.followShop = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const shopFollow_services_1 = require("./shopFollow.services");
exports.followShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopId } = req.body;
    const user = req.user;
    const result = yield shopFollow_services_1.FollowerServices.followShop(user, shopId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Shop Followed successfully",
        data: result,
    });
}));
exports.checkFollowValidity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopId } = req.body;
    const user = req.user;
    const isFollowing = yield shopFollow_services_1.FollowerServices.checkValidityOfFollow(user, shopId);
    if (isFollowing) {
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "User is following the shop.",
            data: isFollowing,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: "User is not following the shop.",
            data: null,
        });
    }
}));
exports.unfollowShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopId } = req.body;
    const user = req.user;
    const result = yield shopFollow_services_1.FollowerServices.unfollowShop(user, shopId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "shop unfollow successfully",
        data: result,
    });
}));
exports.FollowerController = {
    followShop: exports.followShop,
    unfollowShop: exports.unfollowShop,
    checkFollowValidity: exports.checkFollowValidity,
};
