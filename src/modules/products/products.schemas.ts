import { z } from 'zod';
import { idParamSchema, paginationQuerySchema } from '../../shared/validators/commonSchemas';

const productBody = z.object({
  name: z.string().trim().min(2).max(255),
  slug: z.string().trim().min(2).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase and kebab-case.'),
  description: z.string().trim().optional().nullable(),
  price: z.coerce.number().nonnegative(),
  productSituationId: z.coerce.number().int().positive(),
  productCategoryId: z.coerce.number().int().positive()
});

export const listProductsSchema = z.object({
  query: paginationQuerySchema.extend({
    productSituationId: z.coerce.number().int().positive().optional(),
    productCategoryId: z.coerce.number().int().positive().optional()
  })
});

export const getProductByIdSchema = idParamSchema;

export const createProductSchema = z.object({
  body: productBody
});

export const updateProductSchema = z.object({
  params: idParamSchema.shape.params,
  body: productBody.partial().refine((body) => Object.keys(body).length > 0, {
    message: 'At least one field must be provided.'
  })
});
