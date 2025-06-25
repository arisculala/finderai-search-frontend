import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import tenantRoutes from './routes/tenants';

dotenv.config();

const app = express();

// Middleware to allow JSON parsing and cookie handling
app.use(express.json());
app.use(cookieParser());

// CORS setup to allow credentials (cookies) from frontend
app.use(
  cors({
    origin: process.env.FRONTEND_BACKEND_BASE_URL || 'http://localhost:4000',
    credentials: true,
  })
);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tenants', tenantRoutes);

// Start server
const PORT = 3003;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
