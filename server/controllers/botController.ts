import axios from "axios";
import { Request, Response } from "express";

const API_URL = process.env.VITE_BACKEND_BASE_URL
  ? `${process.env.VITE_BACKEND_BASE_URL}/bots`
  : "http://localhost:8081/api/v1/admin/bots";

export const getAllBots = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (error: unknown) {
    console.error("Error fetching bots:", error);
    res.status(500).json({ error: "Failed to fetch bots" });
  }
};

export const createBot = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.header("X-User-Id") || "";

    const response = await axios.post(API_URL, req.body, {
      headers: {
        "X-User-Id": userId,
      },
    });
    res.status(201).json(response.data);
  } catch (error: unknown) {
    console.error("Error creating bot:", error);
    res.status(500).json({ error: "Failed to create bot" });
  }
};

export const getBotById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (error: unknown) {
    console.error("Error getting bot:", error);
    res.status(500).json({ error: "Failed to fetch bot" });
  }
};

export const updateBot = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.put(`${API_URL}/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error: unknown) {
    console.error("Error updating bot:", error);
    res.status(500).json({ error: "Failed to update bot" });
  }
};

export const deleteBot = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.delete(`${API_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (error: unknown) {
    console.error("Error deleting bot:", error);
    res.status(500).json({ error: "Failed to delete bot" });
  }
};
