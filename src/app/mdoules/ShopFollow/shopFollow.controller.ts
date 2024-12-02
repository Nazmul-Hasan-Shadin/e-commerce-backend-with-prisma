import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ShopController } from "../shop/shop.controller";
import { FollowerServices } from "./shopFollow.services";

export const followShop = catchAsync(async (req, res) => {
    const { userId, shopId } = req.body;

    const user=req.user;
  
    const result = await FollowerServices.followShop(user, shopId);
  

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Shop Followed successfully",
        data: result,
      });
  });
  
  // Unfollow a Shop
  export const unfollowShop = catchAsync(async (req, res) => {
    const { userId, shopId } = req.body;
    const user=req.user
  
    const result = await FollowerServices.unfollowShop(user, shopId);
  
   
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "shop unfollow successfully",
    data: result,
  });
  });
  



export const FollowerController = {
   followShop,
   unfollowShop
};
