import { Router } from 'express';
import { validate } from '../../shared/middlewares/validate';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { situationsController } from './situations.controller';
import { createSituationSchema, getSituationByIdSchema, listSituationsSchema, updateSituationSchema } from './situations.schemas';

export const situationsRoutes = Router();

situationsRoutes.get('/', validate(listSituationsSchema), asyncHandler(situationsController.list));
situationsRoutes.get('/:id', validate(getSituationByIdSchema), asyncHandler(situationsController.findById));
situationsRoutes.post('/', validate(createSituationSchema), asyncHandler(situationsController.create));
situationsRoutes.patch('/:id', validate(updateSituationSchema), asyncHandler(situationsController.update));
situationsRoutes.delete('/:id', validate(getSituationByIdSchema), asyncHandler(situationsController.delete));
