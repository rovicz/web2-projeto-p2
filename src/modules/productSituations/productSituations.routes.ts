import { Router } from 'express';
import { validate } from '../../shared/middlewares/validate';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { productSituationsController } from './productSituations.controller';
import { createProductSituationSchema, getProductSituationByIdSchema, listProductSituationsSchema, updateProductSituationSchema } from './productSituations.schemas';

export const productSituationsRoutes = Router();

productSituationsRoutes.get('/', validate(listProductSituationsSchema), asyncHandler(productSituationsController.list));
productSituationsRoutes.get('/:id', validate(getProductSituationByIdSchema), asyncHandler(productSituationsController.findById));
productSituationsRoutes.post('/', validate(createProductSituationSchema), asyncHandler(productSituationsController.create));
productSituationsRoutes.patch('/:id', validate(updateProductSituationSchema), asyncHandler(productSituationsController.update));
productSituationsRoutes.delete('/:id', validate(getProductSituationByIdSchema), asyncHandler(productSituationsController.delete));
