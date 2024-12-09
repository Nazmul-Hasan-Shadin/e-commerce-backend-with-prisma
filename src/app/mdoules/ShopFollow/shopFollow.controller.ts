import { Request } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ShopController } from "../shop/shop.controller";
import { FollowerServices } from "./shopFollow.services";
import { IAuthUser } from "../../../interface/common";

export const followShop = catchAsync(
  async (req: Request & { user?: IAuthUser }, res) => {
    const { shopId } = req.body;

    const user = req.user;

    const result = await FollowerServices.followShop(user, shopId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Shop Followed successfully",
      data: result,
    });
  }
);

export const checkFollowValidity = catchAsync(
  async (req: Request & { user?: IAuthUser }, res) => {
    const { shopId } = req.body;

    const user = req.user;

    const isFollowing = await FollowerServices.checkValidityOfFollow(
      user,
      shopId
    );
    console.log(isFollowing, "isFollowing");

    if (isFollowing) {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User is following the shop.",
        data: isFollowing,
      });
    } else {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User is not following the shop.",
        data: null,
      });
    }
  }
);

export const unfollowShop = catchAsync(
  async (req: Request & { user?: IAuthUser }, res) => {
    const { shopId } = req.body;
    const user = req.user;

    const result = await FollowerServices.unfollowShop(user, shopId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "shop unfollow successfully",
      data: result,
    });
  }
);

export const FollowerController = {
  followShop,
  unfollowShop,
  checkFollowValidity,
};
