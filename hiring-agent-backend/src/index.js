import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/index.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { CORS_ALLOWED_ORIGINS } from './config/env.js';

const app = express();
app.use(helmet());
const whitelist = (CORS_ALLOWED_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean);
if (whitelist.length > 0) {
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || whitelist.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    }),
  );
} else {
  app.use(cors());
}
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

app.use('/api', router);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`hiring-agent-backend listening on http://localhost:${port}`);
});
