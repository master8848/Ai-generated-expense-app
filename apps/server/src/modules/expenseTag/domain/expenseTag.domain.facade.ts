import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { ExpenseTag } from './expenseTag.model'

import { Expense } from '../../expense/domain'

import { Tag } from '../../tag/domain'

@Injectable()
export class ExpenseTagDomainFacade {
  constructor(
    @InjectRepository(ExpenseTag)
    private repository: Repository<ExpenseTag>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<ExpenseTag>): Promise<ExpenseTag> {
    return this.repository.save(values)
  }

  async update(
    item: ExpenseTag,
    values: Partial<ExpenseTag>,
  ): Promise<ExpenseTag> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: ExpenseTag): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<ExpenseTag> = {},
  ): Promise<ExpenseTag[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<ExpenseTag> = {},
  ): Promise<ExpenseTag> {
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

  async findManyByExpense(
    item: Expense,
    queryOptions: RequestHelper.QueryOptions<ExpenseTag> = {},
  ): Promise<ExpenseTag[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('expense')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        expenseId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByTag(
    item: Tag,
    queryOptions: RequestHelper.QueryOptions<ExpenseTag> = {},
  ): Promise<ExpenseTag[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('tag')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        tagId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
