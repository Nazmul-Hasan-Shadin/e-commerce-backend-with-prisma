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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (to, html) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: process.env.NODE_ENV === "production", // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "nazmulhasanshadin000@gmail.com",
            pass: process.env.APP_PASS,
        },
    });
    yield transporter.sendMail({
        from: "nazmulhasanshadin000@gmail.com", // sender address
        to, // list of receivers
        subject: "Reset your password ✔", // Subject line
        text: "whats up ! Reset your password to save your life?", // plain text body
        html,
    });
    console.log("done mail sent");
});
exports.sendEmail = sendEmail;
