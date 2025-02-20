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
exports.PaymentServices = void 0;
const payment_const_1 = __importDefault(require("./payment.const"));
const createPaymentIntend = (price) => __awaiter(void 0, void 0, void 0, function* () {
    const priceamount = Math.round(price * 100);
    const paymentIntent = yield payment_const_1.default.paymentIntents.create({
        amount: priceamount,
        currency: "usd",
        payment_method_types: ["card"],
    });
    return paymentIntent;
});
exports.PaymentServices = {
    createPaymentIntend,
};
