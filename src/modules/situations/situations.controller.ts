import { Request, Response } from 'express';
import { situationsService } from './situations.service';

export const situationsController = {
  async list(request: Request, response: Response) {
    const result = await situationsService.list(request.query);
    response.json(result);
  },

  async findById(request: Request, response: Response) {
    const data = await situationsService.findById(Number(request.params.id));
    response.json({ data });
  },

  async create(request: Request, response: Response) {
    const data = await situationsService.create(request.body);
    response.status(201).json({ data });
  },

  async update(request: Request, response: Response) {
    const data = await situationsService.update(Number(request.params.id), request.body);
    response.json({ data });
  },

  async delete(request: Request, response: Response) {
    await situationsService.delete(Number(request.params.id));
    response.status(204).send();
  }
};
