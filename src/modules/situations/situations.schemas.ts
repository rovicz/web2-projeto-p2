import { z } from 'zod';
import { idParamSchema, paginationQuerySchema } from '../../shared/validators/commonSchemas';

const situationBody = z.object({
  nameSituation: z.string().trim().min(2).max(255)
});

export const listSituationsSchema = z.object({
  query: paginationQuerySchema
});

export const getSituationByIdSchema = idParamSchema;

export const createSituationSchema = z.object({
  body: situationBody
});

export const updateSituationSchema = z.object({
  params: idParamSchema.shape.params,
  body: situationBody.partial().refine((body) => Object.keys(body).length > 0, {
    message: 'At least one field must be provided.'
  })
});
