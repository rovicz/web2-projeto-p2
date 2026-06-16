import { Request, Response } from 'express';
import { productSituationsService } from './productSituations.service';

export const productSituationsController = {
  async list(request: Request, response: Response) {
    const result = await productSituationsService.list(request.query);
    response.json(result);
  },

  async findById(request: Request, response: Response) {
    const data = await productSituationsService.findById(Number(request.params.id));
    response.json({ data });
  },

  async create(request: Request, response: Response) {
    const data = await productSituationsService.create(request.body);
    response.status(201).json({ data });
  },

  async update(request: Request, response: Response) {
    const data = await productSituationsService.update(Number(request.params.id), request.body);
    response.json({ data });
  },

  async delete(request: Request, response: Response) {
    await productSituationsService.delete(Number(request.params.id));
    response.status(204).send();
  }
};
