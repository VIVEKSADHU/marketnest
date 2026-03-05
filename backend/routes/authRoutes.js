import express from "express";
import {
  signup,
  login,
  refreshToken,
  logout,
  getMe
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

export default router;

