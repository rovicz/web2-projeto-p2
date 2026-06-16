import { Router } from 'express';
import { validate } from '../../shared/middlewares/validate';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { productsController } from './products.controller';
import { createProductSchema, getProductByIdSchema, listProductsSchema, updateProductSchema } from './products.schemas';

export const productsRoutes = Router();

productsRoutes.get('/', validate(listProductsSchema), asyncHandler(productsController.list));
productsRoutes.get('/:id', validate(getProductByIdSchema), asyncHandler(productsController.findById));
productsRoutes.post('/', validate(createProductSchema), asyncHandler(productsController.create));
productsRoutes.patch('/:id', validate(updateProductSchema), asyncHandler(productsController.update));
productsRoutes.delete('/:id', validate(getProductByIdSchema), asyncHandler(productsController.delete));
