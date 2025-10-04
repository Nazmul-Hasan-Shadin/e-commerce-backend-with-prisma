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
exports.BannerController = exports.updateBannerIntoDb = exports.getBannerFromDb = exports.createBanner = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const banner_services_1 = require("./banner.services");
exports.createBanner = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const path = req.file.path;
        req.body.data = JSON.parse(req.body.data);
        req.body.data.image = path;
    }
    const result = yield banner_services_1.BannerServices.createBannerIntoDb(req.body.data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Banner created successful",
        data: result,
    });
}));
exports.getBannerFromDb = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield banner_services_1.BannerServices.getBannerFromDb();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Banner retrieved successful",
        data: result,
    });
}));
exports.updateBannerIntoDb = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const path = req.file.path;
        req.body.data = JSON.parse(req.body.data);
        req.body.data.image = path;
    }
    const result = yield banner_services_1.BannerServices.updateBannerIntoDb(req.body.data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Banner created successful",
        data: result,
    });
}));
exports.BannerController = {
    createBanner: exports.createBanner,
    getBannerFromDb: exports.getBannerFromDb,
    updateBannerIntoDb: exports.updateBannerIntoDb
};
