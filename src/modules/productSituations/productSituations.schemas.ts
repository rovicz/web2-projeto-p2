import { z } from 'zod';
import { idParamSchema, paginationQuerySchema } from '../../shared/validators/commonSchemas';

const productSituationBody = z.object({
  name: z.string().trim().min(2).max(255)
});

export const listProductSituationsSchema = z.object({
  query: paginationQuerySchema
});

export const getProductSituationByIdSchema = idParamSchema;

export const createProductSituationSchema = z.object({
  body: productSituationBody
});

export const updateProductSituationSchema = z.object({
  params: idParamSchema.shape.params,
  body: productSituationBody.partial().refine((body) => Object.keys(body).length > 0, {
    message: 'At least one field must be provided.'
  })
});
