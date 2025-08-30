import http from 'http';
import app from './app';
import { config } from './config';
import { logger } from './utils/logger';
import { attachToServer } from './realtime';

const server = http.createServer(app);
attachToServer(server);

server.listen(config.port, () => logger.info({ port: config.port }, 'FixiDesk API listening'));
