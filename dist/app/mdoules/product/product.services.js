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
exports.ProductServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const createProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        // const uploadedProfileImage = await fileUpload.uploadToCloudinary(req.file);
        req.body.images = req === null || req === void 0 ? void 0 : req.file.path;
    }
    console.log(req.body, "iam file");
    const result = yield prisma_1.default.product.create({
        data: req.body
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
    yield prisma_1.default.product.delete({
        where: { id: productId },
    });
    return { message: "Product deleted successfully" };
});
exports.ProductServices = {
    createProduct,
    updateProduct,
    deleteProduct,
};
