import { Brackets } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Product } from '../../database/entities/Product';
import { ProductCategory } from '../../database/entities/ProductCategory';
import { ProductSituation } from '../../database/entities/ProductSituation';
import { ApiError } from '../../shared/errors/ApiError';
import { paginationMeta, parsePagination } from '../../shared/utils/pagination';

const repository = () => AppDataSource.getRepository(Product);
const categoriesRepository = () => AppDataSource.getRepository(ProductCategory);
const productSituationsRepository = () => AppDataSource.getRepository(ProductSituation);

type ListInput = {
  page?: unknown;
  limit?: unknown;
  search?: string;
  productSituationId?: unknown;
  productCategoryId?: unknown;
};

type CreateInput = {
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  productSituationId: number;
  productCategoryId: number;
};

type UpdateInput = Partial<CreateInput>;

const ensureCategoryExists = async (productCategoryId: number) => {
  const productCategory = await categoriesRepository().findOne({ where: { id: productCategoryId } });

  if (!productCategory) {
    throw new ApiError(400, 'Invalid productCategoryId.');
  }
};

const ensureProductSituationExists = async (productSituationId: number) => {
  const productSituation = await productSituationsRepository().findOne({ where: { id: productSituationId } });

  if (!productSituation) {
    throw new ApiError(400, 'Invalid productSituationId.');
  }
};

const ensureSlugIsAvailable = async (slug: string, ignoreProductId?: number) => {
  const product = await repository().findOne({ where: { slug } });

  if (product && product.id !== ignoreProductId) {
    throw new ApiError(409, 'Slug already in use.');
  }
};

const decimal = (value: number) => value.toFixed(2);

export const productsService = {
  async list(input: ListInput) {
    const { page, limit, skip, take } = parsePagination(input);
    const query = repository()
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productCategory', 'productCategory')
      .leftJoinAndSelect('product.productSituation', 'productSituation')
      .orderBy('product.id', 'ASC')
      .skip(skip)
      .take(take);

    if (input.search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('product.name LIKE :search', { search: `%${input.search}%` })
            .orWhere('product.slug LIKE :search', { search: `%${input.search}%` })
            .orWhere('product.description LIKE :search', { search: `%${input.search}%` });
        })
      );
    }

    if (input.productCategoryId) {
      query.andWhere('product.productCategoryId = :productCategoryId', {
        productCategoryId: Number(input.productCategoryId)
      });
    }

    if (input.productSituationId) {
      query.andWhere('product.productSituationId = :productSituationId', {
        productSituationId: Number(input.productSituationId)
      });
    }

    const [data, total] = await query.getManyAndCount();

    return { data, meta: paginationMeta(page, limit, total) };
  },

  async findById(id: number) {
    const product = await repository().findOne({
      where: { id },
      relations: {
        productCategory: true,
        productSituation: true
      }
    });

    if (!product) {
      throw new ApiError(404, 'Product not found.');
    }

    return product;
  },

  async create(input: CreateInput) {
    await ensureCategoryExists(input.productCategoryId);
    await ensureProductSituationExists(input.productSituationId);
    await ensureSlugIsAvailable(input.slug);

    const product = repository().create({
      ...input,
      description: input.description ?? null,
      price: decimal(input.price)
    });

    const created = await repository().save(product);
    return this.findById(created.id);
  },

  async update(id: number, input: UpdateInput) {
    const product = await this.findById(id);

    if (input.productCategoryId) {
      await ensureCategoryExists(input.productCategoryId);
    }

    if (input.productSituationId) {
      await ensureProductSituationExists(input.productSituationId);
    }

    if (input.slug) {
      await ensureSlugIsAvailable(input.slug, id);
    }

    repository().merge(product, {
      ...input,
      price: input.price !== undefined ? decimal(input.price) : product.price,
      description: input.description === undefined ? product.description : input.description
    });

    const updated = await repository().save(product);
    return this.findById(updated.id);
  },

  async delete(id: number) {
    const product = await this.findById(id);
    await repository().remove(product);
  }
};
