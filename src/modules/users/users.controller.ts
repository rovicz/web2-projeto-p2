import { Request, Response } from 'express';
import { usersService } from './users.service';

export const usersController = {
  async list(request: Request, response: Response) {
    const result = await usersService.list(request.query);
    response.json(result);
  },

  async findById(request: Request, response: Response) {
    const data = await usersService.findById(Number(request.params.id));
    response.json({ data });
  },

  async create(request: Request, response: Response) {
    const data = await usersService.create(request.body);
    response.status(201).json({ data });
  },

  async update(request: Request, response: Response) {
    const data = await usersService.update(Number(request.params.id), request.body);
    response.json({ data });
  },

  async delete(request: Request, response: Response) {
    await usersService.delete(Number(request.params.id));
    response.status(204).send();
  }
};
