import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { UserOrganization } from './userOrganization.model'

import { User } from '../../user/domain'

import { Organization } from '../../organization/domain'

@Injectable()
export class UserOrganizationDomainFacade {
  constructor(
    @InjectRepository(UserOrganization)
    private repository: Repository<UserOrganization>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<UserOrganization>): Promise<UserOrganization> {
    return this.repository.save(values)
  }

  async update(
    item: UserOrganization,
    values: Partial<UserOrganization>,
  ): Promise<UserOrganization> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: UserOrganization): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<UserOrganization> = {},
  ): Promise<UserOrganization[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<UserOrganization> = {},
  ): Promise<UserOrganization> {
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

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<UserOrganization> = {},
  ): Promise<UserOrganization[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByOrganization(
    item: Organization,
    queryOptions: RequestHelper.QueryOptions<UserOrganization> = {},
  ): Promise<UserOrganization[]> {
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
