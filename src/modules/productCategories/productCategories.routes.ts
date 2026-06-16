import { Router } from 'express';
import { validate } from '../../shared/middlewares/validate';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { productCategoriesController } from './productCategories.controller';
import { createProductCategorySchema, getProductCategoryByIdSchema, listProductCategoriesSchema, updateProductCategorySchema } from './productCategories.schemas';

export const productCategoriesRoutes = Router();

productCategoriesRoutes.get('/', validate(listProductCategoriesSchema), asyncHandler(productCategoriesController.list));
productCategoriesRoutes.get('/:id', validate(getProductCategoryByIdSchema), asyncHandler(productCategoriesController.findById));
productCategoriesRoutes.post('/', validate(createProductCategorySchema), asyncHandler(productCategoriesController.create));
productCategoriesRoutes.patch('/:id', validate(updateProductCategorySchema), asyncHandler(productCategoriesController.update));
productCategoriesRoutes.delete('/:id', validate(getProductCategoryByIdSchema), asyncHandler(productCategoriesController.delete));
