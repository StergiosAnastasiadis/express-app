import type { NextFunction, Request, Response } from 'express';

import * as z from 'zod';

interface RequestSchema {
  body?: z.ZodObject;
  params?: z.ZodObject;
  query?: z.ZodObject;
}

export const validate = (schemas: RequestSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (schemas.body) {
      const result = await schemas.body.safeParseAsync(req.body);
      const error = result.error;

      if (error) {
        res.status(400).json({
          errors: error instanceof z.ZodError ? error.issues : 'Invalid body',
          status: 'fail',
        });

        return;
      }
    }

    if (schemas.params) {
      const result = await schemas.params.safeParseAsync(req.params);
      console.log(result);
    }

    if (schemas.query) {
      const result = await schemas.query.safeParseAsync(req.query);
      console.log(result);
    }

    next();
  };
};
