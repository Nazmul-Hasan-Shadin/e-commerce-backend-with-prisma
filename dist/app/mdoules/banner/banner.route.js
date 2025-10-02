"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const banner_controller_1 = require("./banner.controller");
const fileUploader_1 = require("../../../utils/fileUploader");
const router = express_1.default.Router();
router.get('/', banner_controller_1.BannerController.getBannerFromDb);
router.post('/', fileUploader_1.fileUpload.multerUpload.single('file'), banner_controller_1.BannerController.createBanner);
router.post('/:id', fileUploader_1.fileUpload.multerUpload.single('file'), banner_controller_1.BannerController.updateBannerIntoDb);
exports.BannerRoutes = router;
