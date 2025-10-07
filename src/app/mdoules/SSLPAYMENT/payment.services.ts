import axios from "axios";
import config from "../../../config";
import AppError from "../../error/AppError";

const initPayment = async (orderId: string) => {
  const data = {
    total_amount: 100,
    currency: "BDT",
    tran_id: "REF1233", // use unique tran_id for each api call
    success_url: "https://independent-mart.vercel.app/success-payment",
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "https://independent-shop.vercel.app/api/v1/payment/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
    store_id: config.payment.store_id,

    store_passwd: config.payment.store_pass,
  };

  const response = await axios.post(
    "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
    data,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );


  return {
    paymentUrl: response.data.GatewayPageURL,
  };
};

const validatePayment = async (payload: any) => {
    console.log('iam called',payload);
    
  try {
    const response = await axios({
      method: "GET",
      url: `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?wsdl?val_id=${payload.val_id}&store_id=${config.payment.store_id}&store_passwd=${config.payment.store_pass}&format=json`,
    });

    return response.data;


  } catch (error) {
    throw new AppError(500, "payment validation failed");
  }
};

const validatePayment2 = async (payload: { val_id: string; tran_id?: string; status?: string }) => {
  try {
    const { val_id } = payload;payload

    // SSLCommerz Validation API (sandbox/prod অনুযায়ী base URL সেট করিস)
    const response = await axios.get(
      `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${config.payment.store_id}&store_passwd=${config.payment.store_pass}&v=1&format=json`
    );

    // এখানে চাইলে DB update করতে পারিস (order status = "paid") ইত্যাদি
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Payment validation failed");
  }
};
export const PaymentServicesSSL = {
  initPayment,
  validatePayment
  ,
  validatePayment2
};
