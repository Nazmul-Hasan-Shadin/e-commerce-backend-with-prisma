import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { PaymentServicesSSL } from "./payment.services";

const initPayment=catchAsync(async(req,res , next)=>{

    const result= await PaymentServicesSSL.initPayment(req.params.orderId)
        sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Orders retrieved successfully",
      data: result,
    });
  })

  export const PaymentControllerSSL={
    initPayment
  }