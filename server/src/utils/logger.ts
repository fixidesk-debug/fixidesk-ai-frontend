import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: ['req.headers.authorization', 'password', 'token', 'access_token', 'refresh_token'],
  transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
});
