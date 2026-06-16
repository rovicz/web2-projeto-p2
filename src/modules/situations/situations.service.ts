import { Like } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Situation } from '../../database/entities/Situation';
import { ApiError } from '../../shared/errors/ApiError';
import { paginationMeta, parsePagination } from '../../shared/utils/pagination';

const repository = () => AppDataSource.getRepository(Situation);

type ListInput = {
  page?: unknown;
  limit?: unknown;
  search?: string;
};

type CreateInput = {
  nameSituation: string;
};

type UpdateInput = Partial<CreateInput>;

export const situationsService = {
  async list(input: ListInput) {
    const { page, limit, skip, take } = parsePagination(input);
    const where = input.search ? { nameSituation: Like(`%${input.search}%`) } : undefined;
    const [data, total] = await repository().findAndCount({
      where,
      order: { id: 'ASC' },
      skip,
      take
    });

    return { data, meta: paginationMeta(page, limit, total) };
  },

  async findById(id: number) {
    const situation = await repository().findOne({ where: { id } });

    if (!situation) {
      throw new ApiError(404, 'Situation not found.');
    }

    return situation;
  },

  async create(input: CreateInput) {
    const situation = repository().create(input);
    return repository().save(situation);
  },

  async update(id: number, input: UpdateInput) {
    const situation = await this.findById(id);
    repository().merge(situation, input);
    return repository().save(situation);
  },

  async delete(id: number) {
    const situation = await this.findById(id);
    await repository().remove(situation);
  }
};
