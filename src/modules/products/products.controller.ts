import { Request, Response } from 'express';
import { productsService } from './products.service';

export const productsController = {
  async list(request: Request, response: Response) {
    const result = await productsService.list(request.query);
    response.json(result);
  },

  async findById(request: Request, response: Response) {
    const data = await productsService.findById(Number(request.params.id));
    response.json({ data });
  },

  async create(request: Request, response: Response) {
    const data = await productsService.create(request.body);
    response.status(201).json({ data });
  },

  async update(request: Request, response: Response) {
    const data = await productsService.update(Number(request.params.id), request.body);
    response.json({ data });
  },

  async delete(request: Request, response: Response) {
    await productsService.delete(Number(request.params.id));
    response.status(204).send();
  }
};
