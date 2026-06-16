import bcrypt from 'bcryptjs';
import { Brackets } from 'typeorm';
import { env } from '../../config/env';
import { AppDataSource } from '../../data-source';
import { Situation } from '../../database/entities/Situation';
import { User } from '../../database/entities/User';
import { ApiError } from '../../shared/errors/ApiError';
import { paginationMeta, parsePagination } from '../../shared/utils/pagination';

const repository = () => AppDataSource.getRepository(User);
const situationsRepository = () => AppDataSource.getRepository(Situation);

type ListInput = {
  page?: unknown;
  limit?: unknown;
  search?: string;
};

type CreateInput = {
  name: string;
  email: string;
  password: string;
  recoverPassword?: string | null;
  situationId: number;
};

type UpdateInput = Partial<CreateInput>;

const ensureSituationExists = async (situationId: number) => {
  const situation = await situationsRepository().findOne({ where: { id: situationId } });

  if (!situation) {
    throw new ApiError(400, 'Invalid situationId.');
  }
};

const ensureEmailIsAvailable = async (email: string, ignoreUserId?: number) => {
  const user = await repository().findOne({ where: { email } });

  if (user && user.id !== ignoreUserId) {
    throw new ApiError(409, 'Email already in use.');
  }
};

export const usersService = {
  async list(input: ListInput) {
    const { page, limit, skip, take } = parsePagination(input);
    const query = repository()
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.situation', 'situation')
      .orderBy('user.id', 'ASC')
      .skip(skip)
      .take(take);

    if (input.search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('user.name LIKE :search', { search: `%${input.search}%` })
            .orWhere('user.email LIKE :search', { search: `%${input.search}%` });
        })
      );
    }

    const [data, total] = await query.getManyAndCount();

    return { data, meta: paginationMeta(page, limit, total) };
  },

  async findById(id: number) {
    const user = await repository().findOne({ where: { id }, relations: { situation: true } });

    if (!user) {
      throw new ApiError(404, 'User not found.');
    }

    return user;
  },

  async create(input: CreateInput) {
    await ensureSituationExists(input.situationId);
    await ensureEmailIsAvailable(input.email);

    const user = repository().create({
      ...input,
      password: await bcrypt.hash(input.password, env.bcryptSaltRounds),
      recoverPassword: input.recoverPassword ?? null
    });

    const created = await repository().save(user);
    return this.findById(created.id);
  },

  async update(id: number, input: UpdateInput) {
    const user = await repository()
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new ApiError(404, 'User not found.');
    }

    if (input.situationId) {
      await ensureSituationExists(input.situationId);
    }

    if (input.email) {
      await ensureEmailIsAvailable(input.email, id);
    }

    const payload = {
      ...input,
      password: input.password ? await bcrypt.hash(input.password, env.bcryptSaltRounds) : user.password
    };

    repository().merge(user, payload);
    const updated = await repository().save(user);
    return this.findById(updated.id);
  },

  async delete(id: number) {
    const user = await this.findById(id);
    await repository().remove(user);
  }
};
