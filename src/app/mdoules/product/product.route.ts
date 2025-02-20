import express, { NextFunction, Request, Response } from "express";
import { ProductController } from "./product.controller";
import { fileUpload } from "../../../utils/fileUploader";

const router = express();
router.get("/", ProductController.getAllProduct);
router.get("/:id", ProductController.getSingleProduct);
router.get("/shop/products/:shopId", ProductController.getProductByShopId);

router.post(
  "/create-product",
  fileUpload.multerUpload.array("files"),
  (req: Request, res: Response, next: NextFunction) => {
    (req.body = JSON.parse(req.body.data)),
      ProductController.createProductIntoDb(req, res, next);
  }
);

router.patch("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export const ProductRoutes = router;
