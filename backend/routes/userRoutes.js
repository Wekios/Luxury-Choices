import express from "express";
import { authUser, getUserProfile } from "../controllers/index.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);

router.route("/profile").get(protect, getUserProfile);

export { router as userRoutes };
