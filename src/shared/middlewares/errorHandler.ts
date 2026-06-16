import { ErrorRequestHandler } from 'express';
import { QueryFailedError } from 'typeorm';
import { ApiError } from '../errors/ApiError';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ApiError) {
    response.status(error.statusCode).json({
      error: true,
      message: error.message,
      details: error.details
    });
    return;
  }

  if (error instanceof QueryFailedError) {
    response.status(409).json({
      error: true,
      message: 'Database constraint error.',
      details: error.message
    });
    return;
  }

  console.error(error);

  response.status(500).json({
    error: true,
    message: 'Internal server error.'
  });
};
