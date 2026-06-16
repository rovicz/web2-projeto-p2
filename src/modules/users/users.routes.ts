import { Router } from 'express';
import { validate } from '../../shared/middlewares/validate';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { usersController } from './users.controller';
import { createUserSchema, getUserByIdSchema, listUsersSchema, updateUserSchema } from './users.schemas';

export const usersRoutes = Router();

usersRoutes.get('/', validate(listUsersSchema), asyncHandler(usersController.list));
usersRoutes.get('/:id', validate(getUserByIdSchema), asyncHandler(usersController.findById));
usersRoutes.post('/', validate(createUserSchema), asyncHandler(usersController.create));
usersRoutes.patch('/:id', validate(updateUserSchema), asyncHandler(usersController.update));
usersRoutes.delete('/:id', validate(getUserByIdSchema), asyncHandler(usersController.delete));
