import { Request, Response } from 'express';
import { productCategoriesService } from './productCategories.service';

export const productCategoriesController = {
  async list(request: Request, response: Response) {
    const result = await productCategoriesService.list(request.query);
    response.json(result);
  },

  async findById(request: Request, response: Response) {
    const data = await productCategoriesService.findById(Number(request.params.id));
    response.json({ data });
  },

  async create(request: Request, response: Response) {
    const data = await productCategoriesService.create(request.body);
    response.status(201).json({ data });
  },

  async update(request: Request, response: Response) {
    const data = await productCategoriesService.update(Number(request.params.id), request.body);
    response.json({ data });
  },

  async delete(request: Request, response: Response) {
    await productCategoriesService.delete(Number(request.params.id));
    response.status(204).send();
  }
};
