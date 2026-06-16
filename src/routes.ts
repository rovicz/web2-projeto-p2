import { Router } from 'express';
import { productCategoriesRoutes } from './modules/productCategories/productCategories.routes';
import { productsRoutes } from './modules/products/products.routes';
import { productSituationsRoutes } from './modules/productSituations/productSituations.routes';
import { situationsRoutes } from './modules/situations/situations.routes';
import { usersRoutes } from './modules/users/users.routes';

export const routes = Router();

routes.get('/health', (_request, response) => {
  response.json({
    data: {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  });
});

routes.use('/situations', situationsRoutes);
routes.use('/users', usersRoutes);
routes.use('/product-categories', productCategoriesRoutes);
routes.use('/product-situations', productSituationsRoutes);
routes.use('/products', productsRoutes);
