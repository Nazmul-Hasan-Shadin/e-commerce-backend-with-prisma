import express, { NextFunction, Request, Response } from "express";
import { ProductController } from "./product.controller";
import { fileUpload } from "../../../utils/fileUploader";

const router = express();

router.post(
  "/create-product",
  fileUpload.multerUpload.single("file"),
  (req: Request, res: Response,next:NextFunction) => {
    (req.body = JSON.parse(req.body.data)),
      ProductController.createProductIntoDb(req,res,next);
  }
);

router.patch('/:id',ProductController.updateProduct)
router.delete('/:id',ProductController.deleteProduct)

export const ProductRoutes = router;
