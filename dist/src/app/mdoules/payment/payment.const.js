"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default("sk_test_51OBuOPEkmX02Z923QncbZZVIQHGnZG8a0tMiHVXqTJWwX02BRas7TY3WbjtbwYNiP26t7YrqOfDb6ht7ypteP3NL00CaZy0EnI");
exports.default = stripe;
