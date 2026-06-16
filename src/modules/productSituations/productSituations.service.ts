import { Like } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { ProductSituation } from '../../database/entities/ProductSituation';
import { ApiError } from '../../shared/errors/ApiError';
import { paginationMeta, parsePagination } from '../../shared/utils/pagination';

const repository = () => AppDataSource.getRepository(ProductSituation);

type ListInput = {
  page?: unknown;
  limit?: unknown;
  search?: string;
};

type CreateInput = {
  name: string;
};

type UpdateInput = Partial<CreateInput>;

export const productSituationsService = {
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
    const productSituation = await repository().findOne({ where: { id } });

    if (!productSituation) {
      throw new ApiError(404, 'Product situation not found.');
    }

    return productSituation;
  },

  async create(input: CreateInput) {
    const productSituation = repository().create(input);
    return repository().save(productSituation);
  },

  async update(id: number, input: UpdateInput) {
    const productSituation = await this.findById(id);
    repository().merge(productSituation, input);
    return repository().save(productSituation);
  },

  async delete(id: number) {
    const productSituation = await this.findById(id);
    await repository().remove(productSituation);
  }
};
