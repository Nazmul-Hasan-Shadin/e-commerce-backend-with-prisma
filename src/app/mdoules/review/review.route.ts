import express from "express";
import auth from "../Auth/auth";
import { Role } from "@prisma/client";
import { ReviewController } from "./review.controller";
import { ProductController } from "../product/product.controller";

const router = express.Router();

router.post("/", auth(Role.user), ReviewController.addReview);

router.get("/:productId", ReviewController.getProductWithReview);

export const ReviewRoutes = router;
