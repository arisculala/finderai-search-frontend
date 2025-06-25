import type { LoginCredentials, LoginResponse } from './auth.types';
import api from '../axios';
import { ACCESS_TOKEN_KEY, USER_KEY } from '../../Constants/storage';

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(`/auth/login`, credentials);

    // Save token and user info to localStorage
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    console.debug('Failed to login', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getLoggedInUser = (): unknown => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};
