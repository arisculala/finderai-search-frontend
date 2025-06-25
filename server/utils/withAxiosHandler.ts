import { Request, Response } from 'express';
import { AxiosError } from 'axios';
import { createAxios } from './axiosInstance';

type AxiosHandler = (
  axios: ReturnType<typeof createAxios>,
  req: Request,
  res: Response
) => Promise<void>;

export function withAxiosHandler(handler: AxiosHandler) {
  return async (req: Request, res: Response) => {
    try {
      const axios = createAxios(req);
      await handler(axios, req, res);
    } catch (error: unknown) {
      console.error('API error:', error);

      // Check if it's an AxiosError with a response
      if (isAxiosErrorWithResponse(error)) {
        const status = error.response?.status || 500;

        // Type-safe extraction of `message`
        const data = error.response?.data as { message?: string };
        const message = data.message || 'Unexpected error occurred';

        return res.status(status).json({ message });
      }

      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}

// Type guard to check if error is an AxiosError with response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isAxiosErrorWithResponse(error: any): error is AxiosError {
  return error?.isAxiosError === true && error.response !== undefined;
}
