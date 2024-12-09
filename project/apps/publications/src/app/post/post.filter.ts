import { Prisma } from '@prisma/client';

import { SortType } from '@project/lib/shared/app/types';

export type PostFilter = {
  sort: SortType,
  count: number
}

export function getPostFilter(filter: PostFilter): Prisma.PublicationWhereInput | undefined {
  if (!filter) {
    return undefined;
  }

  if (filter.sort) {
    return {sort: filter.sort} as Prisma.PublicationWhereInput;
  }

  if (filter.count) {
    return {count: filter.count} as Prisma.PublicationWhereInput;
  }
}
