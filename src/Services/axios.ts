import axios from 'axios';
import toast from 'react-hot-toast';
import { ACCESS_TOKEN_KEY } from '../Constants/storage';

const api = axios.create({
  baseURL: import.meta.env.VITE_FRONTEND_BASE_URL_API,
});

// Attach access token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || 'Unexpected error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

// Helper to merge custom headers
export const withHeaders = (headers = {}) => {
  return {
    headers: {
      ...headers,
    },
  };
};

export default api;
