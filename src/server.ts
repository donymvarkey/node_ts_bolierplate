import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ServerOptions } from './types';
import HealthRouter from './router/healthRoute';
import logger from './utils/logger';
import databaseService from './database/databaseService';
import { initRateLimiter } from './config/rateLimiter';
import responseMessage from './constants/responseMessage';
import httpError from './utils/httpError';
import globalErrorHandler from './middleware/globalErrorHandler';

class Server {
  options: ServerOptions;
  api: Application | null;
  constructor(options: ServerOptions) {
    this.options = options;
    this.api = null;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async configServer() {
    const api = express();

    api.use(express.urlencoded({ limit: '10mb', extended: true }));
    api.use(express.json());
    api.set('x-powered-by', false);
    api.use(helmet());
    api.use(morgan('dev'));
    api.use(
      cors({
        origin: ['*'], //['https://client.com'], // Provide the client URL
        credentials: true
      })
    );
    // api.options('*', cors());
    this.api = api;
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async mountRoutes() {
    this.api?.use('/api/v1/health', HealthRouter);
    return true;
  }

  async startServer() {
    await this.configServer();
    await this.mountRoutes();

    this.api?.use((req: Request, _: Response, next: NextFunction) => {
      try {
        throw new Error(responseMessage.NOT_FOUND('route'));
      } catch (error) {
        httpError(next, error, req, 404);
      }
    });

    this.api?.use(globalErrorHandler);
    void (async () => {
      const server = this.api?.listen(this.options.port);
      try {
        logger.info(`APPLICATION_STARTED`, {
          meta: {
            port: this.options.port,
            SERVER_URL: this.options.server_url
          }
        });
        const connection = await databaseService.connect();
        logger.info(`DATABASE_CONNECTION`, {
          meta: {
            CONNECTION_NAME: connection.name
          }
        });

        initRateLimiter(connection);
        logger.info(`RATE_LIMITER_INITIATED`);
      } catch (error) {
        logger.error('APPLICATION_ERROR:', { meta: error });
        server?.close();
        process.exit(1);
      }
    })();
  }
}

export default Server;
