import express, { Application } from 'express';
import { ServerOptions } from './types';
import cors from 'cors';
import helmet from 'helmet';
import router from './router/apiRouter';
import logger from './utils/logger';

class Server {
  options: ServerOptions;
  api: Application | null;
  constructor(options: ServerOptions) {
    this.options = options;
    this.api = null;
  }

  configServer() {
    const api = express();

    api.use(express.urlencoded({ limit: '10mb', extended: true }));
    api.use(express.json());
    api.set('x-powered-by', false);
    api.use(helmet());
    api.use(
      cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        origin: ['https://client.com'], // Provide the client URL
        credentials: true
      })
    );

    this.api = api;
    return true;
  }

  mountRoutes() {
    this.api?.use('/api/v1', router);
    return true;
  }

  startServer() {
    this.configServer();
    this.mountRoutes();

    const server = this.api?.listen(this.options.port);
    (() => {
      try {
        logger.info(`APPLICATION_STARTED`, {
          meta: {
            port: this.options.port,
            SERVER_URL: this.options.server_url
          }
        });
      } catch (error) {
        logger.error('APPLICATION_ERROR:', { meta: error });
        server?.close((error) => {
          if (error) logger.error('APPLICATION_ERROR:', { meta: error });
          process.exit(1);
        });
      }
    })();
  }
}

export default Server;

