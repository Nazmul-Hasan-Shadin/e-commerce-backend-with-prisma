import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "./user.services";

const createUserIntoDb = catchAsync(async (req, res) => {
  const result = await UserServices.createUser(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "users are created succesful",
    data: result,
  });
});


export const UserController={
    createUserIntoDb
}
