import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.VITE_BACKEND_BASE_URL
  ? `${process.env.VITE_BACKEND_BASE_URL}/auth`
  : "http://localhost:8081/api/v1/admin/auth";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/login`, req.body, {
      withCredentials: true, // IMPORTANT: Send and receive cookies
    });

    // Forward only non-sensitive data to the client
    res.status(200).json({
      user: response.data.user,
    });
  } catch (error: unknown) {
    console.error("Error login:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        withCredentials: true, // ensure cookie is sent
      }
    );

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: unknown) {
    console.error("Error logout:", error);
    res.status(500).json({ error: "Failed to logout" });
  }
};
