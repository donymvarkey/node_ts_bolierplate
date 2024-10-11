import { NextFunction, Request, Response } from 'express';
import { getApplicationHealth, getSystemHealth } from '../utils/common';
import httpResponse from '../utils/httpResponse';
import httpError from '../utils/httpError';

const health = (req: Request, res: Response, next: NextFunction) => {
  try {
    const healthData = {
      application: getApplicationHealth(),
      system: getSystemHealth(),
      timestamp: Date.now()
    };
    httpResponse(req, res, 200, 'Success', healthData);
  } catch (error) {
    httpError(next, error, req, 500);
  }
};

export default { health };

