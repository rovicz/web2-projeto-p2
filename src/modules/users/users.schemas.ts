import { z } from 'zod';
import { idParamSchema, paginationQuerySchema } from '../../shared/validators/commonSchemas';

const userCreateBody = z.object({
  name: z.string().trim().min(2).max(255),
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(255),
  recoverPassword: z.string().max(255).optional().nullable(),
  situationId: z.coerce.number().int().positive()
});

const userUpdateBody = userCreateBody.partial();

export const listUsersSchema = z.object({
  query: paginationQuerySchema
});

export const getUserByIdSchema = idParamSchema;

export const createUserSchema = z.object({
  body: userCreateBody
});

export const updateUserSchema = z.object({
  params: idParamSchema.shape.params,
  body: userUpdateBody.refine((body) => Object.keys(body).length > 0, {
    message: 'At least one field must be provided.'
  })
});
