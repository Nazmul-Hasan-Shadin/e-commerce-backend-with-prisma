"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        expires_in: process.env.EXPIRED_IN,
        refreshToken_sec: process.env.REFRESH_TOKEN_SEC,
        refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
        reset_pass_token: process.env.RESET_PASS_TOKEN,
        reset_pass_link: process.env.RESET_PASS_LINK,
        app_password: process.env.APP_PASSWORD,
        email: process.env.EMAIL,
    },
    payment: {
        store_pass: process.env.STORE_PASS,
        store_id: process.env.STORE_ID
    }
};
