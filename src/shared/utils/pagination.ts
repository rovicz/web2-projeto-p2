export type PaginationInput = {
  page?: unknown;
  limit?: unknown;
};

export const parsePagination = ({ page, limit }: PaginationInput) => {
  const parsedPage = Math.max(Number(page ?? 1), 1);
  const parsedLimit = Math.min(Math.max(Number(limit ?? 10), 1), 100);

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip: (parsedPage - 1) * parsedLimit,
    take: parsedLimit
  };
};

export const paginationMeta = (page: number, limit: number, total: number) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit)
});
