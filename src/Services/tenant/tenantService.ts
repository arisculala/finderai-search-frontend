import axios from "axios";
import type { Tenant } from "./tenant.types";
import { getUsername } from "@/Utils/getUser";

const API_BASE_URL =
  // eslint-disable-next-line no-constant-binary-expression
  `${import.meta.env.VITE_FRONTEND_BASE_URL_API}/tenants` ||
  "http://localhost:3003/api/tenants";

const username = getUsername();

export const getTenants = async (): Promise<Tenant[]> => {
  try {
    const response = await axios.get<Tenant[]>(API_BASE_URL, {
      headers: {
        "X-User-Id": username,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tenants", error);
    throw error;
  }
};

export const createTenant = async (tenantData: Partial<Tenant>) => {
  try {
    const { name, description, active } = tenantData;
    const response = await axios.post<Tenant>(
      API_BASE_URL,
      { name, description, active },
      {
        headers: {
          "X-User-Id": username,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tenant", error);
    throw error;
  }
};
