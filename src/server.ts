import { Server } from 'http';
import mongoose from 'mongoose';
import config from '../config';
import app from './app';
import { errorLogger, logger } from './shared/logger';

let server: Server;

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('MongoDB Database Connected Successfully!');

    app.listen(config.port, () => {
      logger.info(`Application listening on prot ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('MongoDB Database Connection Error:', error);
  }

  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        errorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main().catch(err => errorLogger.error('MongoDB Connection Error: ', err));

process.on('SIGTERM', () => {
  logger.info('SIGTERM received!!!');
  if (server) {
    server.close();
  }
});