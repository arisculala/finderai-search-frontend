import axios from "axios";
import { Request, Response } from "express";

const API_URL = process.env.VITE_BACKEND_BASE_URL
  ? `${process.env.VITE_BACKEND_BASE_URL}/tenants`
  : "http://localhost:8081/api/v1/admin/tenants";

export const getAllTenants = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (error: unknown) {
    console.error("Error fetching tenants:", error);
    res.status(500).json({ error: "Failed to fetch tenants" });
  }
};

export const createTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.header("X-User-Id") || "";

    const response = await axios.post(API_URL, req.body, {
      headers: {
        "X-User-Id": userId,
      },
    });
    res.status(201).json(response.data);
  } catch (error: unknown) {
    console.error("Error creating tenant:", error);
    res.status(500).json({ error: "Failed to create tenant" });
  }
};

export const getTenantById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (error: unknown) {
    console.error("Error getting tenant:", error);
    res.status(500).json({ error: "Failed to fetch tenant" });
  }
};

export const updateTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await axios.put(`${API_URL}/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error: unknown) {
    console.error("Error updating tenant:", error);
    res.status(500).json({ error: "Failed to update tenant" });
  }
};

export const deleteTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await axios.delete(`${API_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (error: unknown) {
    console.error("Error deleting tenant:", error);
    res.status(500).json({ error: "Failed to delete tenant" });
  }
};
