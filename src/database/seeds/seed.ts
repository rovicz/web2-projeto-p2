import bcrypt from 'bcryptjs';
import { env } from '../../config/env';
import { AppDataSource } from '../../data-source';
import { Product } from '../entities/Product';
import { ProductCategory } from '../entities/ProductCategory';
import { ProductSituation } from '../entities/ProductSituation';
import { Situation } from '../entities/Situation';
import { User } from '../entities/User';

const run = async () => {
  await AppDataSource.initialize();

  const situationsRepository = AppDataSource.getRepository(Situation);
  const categoriesRepository = AppDataSource.getRepository(ProductCategory);
  const productSituationsRepository = AppDataSource.getRepository(ProductSituation);
  const usersRepository = AppDataSource.getRepository(User);
  const productsRepository = AppDataSource.getRepository(Product);

  const activeSituation = await situationsRepository.save(
    situationsRepository.create({ nameSituation: 'Ativo' })
  );

  await situationsRepository.save(situationsRepository.create({ nameSituation: 'Inativo' }));

  const category = await categoriesRepository.save(categoriesRepository.create({ name: 'Geral' }));
  const available = await productSituationsRepository.save(productSituationsRepository.create({ name: 'Disponível' }));
  await productSituationsRepository.save(productSituationsRepository.create({ name: 'Indisponível' }));

  await usersRepository.save(
    usersRepository.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('123456', env.bcryptSaltRounds),
      situationId: activeSituation.id
    })
  );

  await productsRepository.save(
    productsRepository.create({
      name: 'Produto exemplo',
      slug: 'produto-exemplo',
      description: 'Produto cadastrado pelo seed.',
      price: '99.90',
      productCategoryId: category.id,
      productSituationId: available.id
    })
  );

  await AppDataSource.destroy();
  console.log('Seed executed successfully.');
};

run().catch(async (error) => {
  console.error(error);
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  process.exit(1);
});
