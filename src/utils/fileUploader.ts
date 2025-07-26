import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ICloudinaryRes } from "../interface/Ifile";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(process.cwd(), "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

cloudinary.config({
  cloud_name: "dxhf5qlpi",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SEC,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

const multerUpload = multer({ storage });

// const uploadToCloudinary = async (
//   file: any
// ):Promise<ICloudinaryRes | undefined>=> {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       file.path,

//       (error: Error, result:any) => {
//         fs.unlinkSync(file.path);
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );
//   });
// };

// const upload = multer({ storage: storage });

export const fileUpload = {
  multerUpload,
};
