import axios from "axios";
import type { Bot } from "./bot.types";
import { getUsername } from "@/Utils/getUser";

const API_BASE_URL =
  // eslint-disable-next-line no-constant-binary-expression
  `${import.meta.env.VITE_FRONTEND_BASE_URL_API}/bots` ||
  "http://localhost:3003/api/bots";

const username = getUsername();

export const getBots = async (): Promise<Bot[]> => {
  try {
    const response = await axios.get<Bot[]>(API_BASE_URL, {
      headers: {
        "X-User-Id": username,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bots", error);
    throw error;
  }
};

export const createBot = async (botData: Partial<Bot>) => {
  try {
    const { name, description, active } = botData;
    const response = await axios.post<Bot>(
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
    console.error("Failed to fetch bot", error);
    throw error;
  }
};
