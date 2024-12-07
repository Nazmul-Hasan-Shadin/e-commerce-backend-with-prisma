import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../Auth/auth";
import { Role } from "@prisma/client";

const router = express();

router.get(
  "/",
  auth(Role.admin, Role.user, Role.vendor),
  CategoryController.getCategory
);

router.post(
  "/create-category",
  auth(Role.admin),
  CategoryController.createCategory
);

router.put("/:categoryId", CategoryController.updateCategory);
router.delete("/:categoryId", CategoryController.deleteCategory);

export const CategoryRoutes = router;
