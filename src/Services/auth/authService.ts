import axios from "axios";
import type { LoginCredentials, LoginResponse } from "./auth.types";

const API_BASE_URL =
  // eslint-disable-next-line no-constant-binary-expression
  `${import.meta.env.VITE_FRONTEND_BASE_URL_API}/auth` ||
  "http://localhost:3003/api/auth";

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/login`,
      credentials
    );

    // Save token and user info to localStorage
    localStorage.setItem("accessToken", response.data.accessToken);
    if (response.data.refreshToken) {
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    console.error("Login Failed", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("accessToken");
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const getLoggedInUser = (): unknown => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
