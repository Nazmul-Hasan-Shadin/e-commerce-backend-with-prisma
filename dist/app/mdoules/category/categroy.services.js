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
exports.CategoryServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const createCategory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        req.body.images = req === null || req === void 0 ? void 0 : req.file.path;
    }
    const result = prisma_1.default.category.create({
        data: Object.assign({}, req.body),
    });
    return result;
});
const getCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.category.findMany({});
    return result;
});
const getCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.category.findUnique({
        where: {
            id: categoryId,
        },
    });
    return result;
});
const updateCategory = (categoryId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCategory = yield prisma_1.default.category.update({
        where: {
            id: categoryId,
        },
        data,
    });
    return updatedCategory;
});
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.category.delete({
        where: {
            id: categoryId,
        },
    });
    return { message: "Category deleted successfully" };
});
exports.CategoryServices = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getCategoryById,
};
