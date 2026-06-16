import { Like } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { ProductCategory } from '../../database/entities/ProductCategory';
import { ApiError } from '../../shared/errors/ApiError';
import { paginationMeta, parsePagination } from '../../shared/utils/pagination';

const repository = () => AppDataSource.getRepository(ProductCategory);

type ListInput = {
  page?: unknown;
  limit?: unknown;
  search?: string;
};

type CreateInput = {
  name: string;
};

type UpdateInput = Partial<CreateInput>;

export const productCategoriesService = {
  async list(input: ListInput) {
    const { page, limit, skip, take } = parsePagination(input);
    const where = input.search ? { name: Like(`%${input.search}%`) } : undefined;
    const [data, total] = await repository().findAndCount({
      where,
      order: { id: 'ASC' },
      skip,
      take
    });

    return { data, meta: paginationMeta(page, limit, total) };
  },

  async findById(id: number) {
    const productCategory = await repository().findOne({ where: { id } });

    if (!productCategory) {
      throw new ApiError(404, 'Product category not found.');
    }

    return productCategory;
  },

  async create(input: CreateInput) {
    const productCategory = repository().create(input);
    return repository().save(productCategory);
  },

  async update(id: number, input: UpdateInput) {
    const productCategory = await this.findById(id);
    repository().merge(productCategory, input);
    return repository().save(productCategory);
  },

  async delete(id: number) {
    const productCategory = await this.findById(id);
    await repository().remove(productCategory);
  }
};
