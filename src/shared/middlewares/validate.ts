import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { ApiError } from '../errors/ApiError';

export const validate = (schema: z.ZodTypeAny) => {
  return (request: Request, _response: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: request.body,
      params: request.params,
      query: request.query
    });

    if (!result.success) {
      throw new ApiError(400, 'Validation error.', result.error.flatten());
    }

    const parsed = result.data as {
      body?: unknown;
      params?: Record<string, string>;
      query?: Record<string, unknown>;
    };

    if (parsed.body !== undefined) {
      request.body = parsed.body;
    }

    if (parsed.params !== undefined) {
      request.params = parsed.params;
    }

    if (parsed.query !== undefined) {
      request.query = parsed.query as Request['query'];
    }

    next();
  };
};
