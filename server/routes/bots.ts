import express from "express";
import * as botController from "../controllers/botController";

const router = express.Router();

// GET all bots
router.get("/", botController.getAllBots);

// POST create bot
router.post("/", botController.createBot);

// Optional: GET one bot, PUT update, DELETE
router.get("/:id", botController.getBotById);
router.put("/:id", botController.updateBot);
router.delete("/:id", botController.deleteBot);

export default router;
