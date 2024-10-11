import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { EApplicationEnvironment } from '../constants/application';
import responseMessage from '../constants/responseMessage';
import httpError from '../utils/httpError';
import { rateLimiterMongo } from '../config/rateLimiter';

export default (req: Request, _: Response, next: NextFunction) => {
  if (config.env === EApplicationEnvironment.DEVELOPMENT) {
    return next();
  }

  if (rateLimiterMongo) {
    rateLimiterMongo
      .consume(req.ip as string, 1)
      .then(() => {
        next();
      })
      .catch(() => {
        httpError(next, new Error(responseMessage.TOO_MANY_REQUESTS), req, 429);
      });
  }
};

