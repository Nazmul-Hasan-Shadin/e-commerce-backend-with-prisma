import multer from "multer";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


cloudinary.config({
    cloud_name: "dxhf5qlpi",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SEC, 
  });
  
  const uploadToCloudinary = async (
    file: any
  )=> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        file.path,
  
        (error: Error, result) => {
          fs.unlinkSync(file.path);
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  };

const upload = multer({ storage: storage });

export const fileUpload = {
  upload,
  uploadToCloudinary
};
