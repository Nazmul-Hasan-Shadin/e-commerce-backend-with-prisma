import express from "express";
import { PaymentServices } from "./payment.services";
import { PaymentController } from "./payment.controller";

const router = express.Router();

router.post("/create-payment-intent", PaymentController.paymentIntend);

export const PaymentRoutes = router;
