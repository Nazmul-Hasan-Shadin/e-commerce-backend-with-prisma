import catchAsync from "../../../utils/catchAsync";
import { PaymentServices } from "./payment.services";

const paymentIntend = catchAsync(async (req, res) => {
  const { price } = req.body;
  const result = await PaymentServices.createPaymentIntend(price);

  res.send({
    clientSecret: result.client_secret,
  });
});

export const PaymentController = {
  paymentIntend,
};
