import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Tag } from './tag.model'

import { Organization } from '../../organization/domain'

@Injectable()
export class TagDomainFacade {
  constructor(
    @InjectRepository(Tag)
    private repository: Repository<Tag>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Tag>): Promise<Tag> {
    return this.repository.save(values)
  }

  async update(item: Tag, values: Partial<Tag>): Promise<Tag> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Tag): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Tag> = {},
  ): Promise<Tag[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Tag> = {},
  ): Promise<Tag> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByOrganization(
    item: Organization,
    queryOptions: RequestHelper.QueryOptions<Tag> = {},
  ): Promise<Tag[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('organization')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        organizationId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
