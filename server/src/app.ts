import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { metricsHandler, metricsMiddleware } from './utils/metrics';
import { authenticate } from './middleware/auth';
import { orgRateLimiter } from './middleware/rateLimit';
import authRoutes from './routes/auth';
import orgRoutes from './routes/orgs';
import ticketRoutes from './routes/tickets';
import messageRoutes from './routes/messages';
import aiRoutes from './routes/ai';
import kbRoutes from './routes/kb';
import outboxRoutes from './routes/outbox';
import adminRoutes from './routes/admin';
import n8nRoutes from './routes/n8n';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(metricsMiddleware);

app.get('/healthz', (_req, res) => res.json({ ok: true }));
app.get('/metrics', metricsHandler);

app.use('/v1/auth', authRoutes);
app.use('/v1', authenticate(false), orgRateLimiter);
app.use('/v1/orgs', orgRoutes);
app.use('/v1/tickets', ticketRoutes);
app.use('/v1/messages', messageRoutes);
app.use('/v1/ai', aiRoutes);
app.use('/v1/kb', kbRoutes);
app.use('/v1/outbox', outboxRoutes);
app.use('/v1/admin', adminRoutes);
app.use('/v1/n8n', n8nRoutes);

export default app;
