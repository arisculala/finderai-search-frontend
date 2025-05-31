import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import tenantRoutes from "./routes/tenants";
import botRoutes from "./routes/bots";

dotenv.config();

const app = express();

// Middleware to allow JSON parsing and cookie handling
app.use(express.json());
app.use(cookieParser());

// CORS setup to allow credentials (cookies) from frontend
app.use(
  cors({
    origin: process.env.FRONTEND_BACKEND_BASE_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/bots", botRoutes);

// Start server
const PORT = 3003;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

/*
const server = app.listen(PORT, () => console.log(`Server started on ${PORT}`));
// Uncomment if you are using socket.io
import { Server as SocketIOServer } from "socket.io";

const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_BASE_URL || "http://localhost:3003",
    credentials: true,
  },
});

// Use a Map to track online users with proper typings
const onlineUsers = new Map<string, string>();

io.on("connection", (socket) => {
  (global as any).chatSocket = socket;

  socket.on("add-user", (userId: string) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data: { to: string; msg: string }) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
*/
