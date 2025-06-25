import axios, { InternalAxiosRequestConfig } from 'axios';
import { Request } from 'express';

export function createAxios(req: Request) {
  const token = req.headers.authorization;

  const instance = axios.create({
    baseURL: process.env.VITE_BACKEND_BASE_URL,
  });

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {};
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  });

  return instance;
}
