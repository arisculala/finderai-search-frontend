import axios from 'axios';
import { Request } from 'express';

export function createAxios(req: Request) {
  const instance = axios.create({
    baseURL: process.env.VITE_BACKEND_BASE_URL,
    headers: {
      ...req.headers, // Forward all incoming headers
    },
  });

  return instance;
}
