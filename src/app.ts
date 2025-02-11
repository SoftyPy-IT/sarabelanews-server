/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import config from './app/config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app: Application = express();

// Security
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Adjust limit as needed during development
});
app.use(limiter);

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = ['https://sarabelanews24.com', config.CROSS_ORIGIN_ADMIN, 'http://localhost:3000'];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'API is healthy',
  });
});

// Root Endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Welcome to the API',
    data: {
      name: 'API',
      version: '1.0.0',
    },
  });
});

// Application Routes
app.use('/api/v1', router);

// Error Handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
