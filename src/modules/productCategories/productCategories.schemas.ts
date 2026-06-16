import { z } from 'zod';
import { idParamSchema, paginationQuerySchema } from '../../shared/validators/commonSchemas';

const productCategoryBody = z.object({
  name: z.string().trim().min(2).max(255)
});

export const listProductCategoriesSchema = z.object({
  query: paginationQuerySchema
});

export const getProductCategoryByIdSchema = idParamSchema;

export const createProductCategorySchema = z.object({
  body: productCategoryBody
});

export const updateProductCategorySchema = z.object({
  params: idParamSchema.shape.params,
  body: productCategoryBody.partial().refine((body) => Object.keys(body).length > 0, {
    message: 'At least one field must be provided.'
  })
});
