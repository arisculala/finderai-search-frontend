import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

// POST /auth/login
router.post("/login", authController.login);

// POST /auth/logout
router.post("/logout", authController.logout);

export default router;
