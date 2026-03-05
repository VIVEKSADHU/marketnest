import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { requireBrand } from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  restoreProduct,
  getDashboardStats,
  getProductById,
  getMyProducts
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/mine", authMiddleware, requireBrand, getMyProducts);

router.post("/", authMiddleware, requireBrand, upload.array("images", 6), createProduct);

router.put("/:id", authMiddleware, requireBrand, upload.array("images", 6), updateProduct);

router.delete("/:id", authMiddleware, requireBrand, deleteProduct);
router.patch("/:id/restore", authMiddleware, requireBrand, restoreProduct);

router.get("/dashboard/stats", authMiddleware, requireBrand, getDashboardStats);
router.get("/:id", getProductById);
export default router;
