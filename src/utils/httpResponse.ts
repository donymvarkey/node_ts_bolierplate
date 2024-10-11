/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response } from 'express';
import { THttpResponse } from '../types';
import logger from './logger';
import config from '../config';
import { EApplicationEnvironment } from '../constants/application';

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
  const response: THttpResponse = {
    success: true,
    statusCode: responseStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl
    },
    message: responseMessage,
    data: data
  };

  //   Log
  logger.info(`CONTROLLER_RESPONSE`, {
    meta: response
  });

  //   Production Env check
  if (config.env === EApplicationEnvironment.PRODUCTION) {
    delete response.request.ip;
  }

  res.status(responseStatusCode).json(response);
};

