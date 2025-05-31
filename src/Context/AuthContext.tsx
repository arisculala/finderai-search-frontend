import React, { createContext, useContext, useState, useEffect } from "react";
import type { LoginCredentials, LoginResponse } from "@/Services/auth/auth.types";
import * as authService from "@/Services/auth/authService";
import { STORAGE_KEYS } from "@/App/Consts";

interface AuthContextType {
	user: LoginResponse["user"] | null;
	login: (credentials: LoginCredentials) => Promise<void>;
	logout: () => void;
	isAuthenticated: boolean;
	loading: boolean;
	hydrated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<LoginResponse["user"] | null>(null);
	const [loading, setLoading] = useState(false);
	const [hydrated, setHydrated] = useState(false);

	// Hydrate user from localStorage once on mount
	useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.user);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setHydrated(true);
  }, []);

	const login = async (credentials: LoginCredentials) => {
		setLoading(true);
		try {
			const response = await authService.login(credentials);
			localStorage.setItem(STORAGE_KEYS.accessToken, response.accessToken);
			localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(response.user));
			setUser(response.user);
		} catch (e) {
			console.log("Error calling login");
      throw e;
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		authService.logout();
		localStorage.removeItem(STORAGE_KEYS.accessToken);
		localStorage.removeItem(STORAGE_KEYS.user);
		setUser(null);
	};

	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider
			value={{ user, login, logout, isAuthenticated, loading, hydrated }}
		>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
};
