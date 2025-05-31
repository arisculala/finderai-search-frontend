import { STORAGE_KEYS } from "@/App/Consts";
import type { LoginResponse } from "@/Services/auth/auth.types";

export const getStoredUser = (): LoginResponse["user"] | null => {
  const user = localStorage.getItem(STORAGE_KEYS.user);
  try {
    return user ? JSON.parse(user) : null;
  } catch {
    console.error("Failed to parse stored user");
    return null;
  }
};

export const getUsername = (): string | null => {
  return getStoredUser()?.username || null;
};

export const getEmail = (): string | null => {
  return getStoredUser()?.email || null;
};

export const getFullName = (): string | null => {
  return getStoredUser()?.fullName || null;
};
