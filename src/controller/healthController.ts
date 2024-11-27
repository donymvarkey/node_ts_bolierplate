import { NextFunction, Request, Response } from 'express';
import httpResponse from '../utils/httpResponse';
import httpError from '../utils/httpError';
import responseMessage from '../constants/responseMessage';
import { getServerHealthDetails } from '../services/healthService';

const health = (req: Request, res: Response, next: NextFunction) => {
  try {
    const healthData = getServerHealthDetails();
    httpResponse(req, res, 200, responseMessage.SUCCESS, healthData);
  } catch (error) {
    httpError(next, error, req, 500);
  }
};

export default { health };

