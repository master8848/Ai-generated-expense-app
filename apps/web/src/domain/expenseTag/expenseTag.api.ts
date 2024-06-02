import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { ExpenseTag } from './expenseTag.model'

export class ExpenseTagApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<ExpenseTag>,
  ): Promise<ExpenseTag[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/expenseTags${buildOptions}`)
  }

  static findOne(
    expenseTagId: string,
    queryOptions?: ApiHelper.QueryOptions<ExpenseTag>,
  ): Promise<ExpenseTag> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/expenseTags/${expenseTagId}${buildOptions}`)
  }

  static createOne(values: Partial<ExpenseTag>): Promise<ExpenseTag> {
    return HttpService.api.post(`/v1/expenseTags`, values)
  }

  static updateOne(
    expenseTagId: string,
    values: Partial<ExpenseTag>,
  ): Promise<ExpenseTag> {
    return HttpService.api.patch(`/v1/expenseTags/${expenseTagId}`, values)
  }

  static deleteOne(expenseTagId: string): Promise<void> {
    return HttpService.api.delete(`/v1/expenseTags/${expenseTagId}`)
  }

  static findManyByExpenseId(
    expenseId: string,
    queryOptions?: ApiHelper.QueryOptions<ExpenseTag>,
  ): Promise<ExpenseTag[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/expenses/expense/${expenseId}/expenseTags${buildOptions}`,
    )
  }

  static createOneByExpenseId(
    expenseId: string,
    values: Partial<ExpenseTag>,
  ): Promise<ExpenseTag> {
    return HttpService.api.post(
      `/v1/expenses/expense/${expenseId}/expenseTags`,
      values,
    )
  }

  static findManyByTagId(
    tagId: string,
    queryOptions?: ApiHelper.QueryOptions<ExpenseTag>,
  ): Promise<ExpenseTag[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/tags/tag/${tagId}/expenseTags${buildOptions}`,
    )
  }

  static createOneByTagId(
    tagId: string,
    values: Partial<ExpenseTag>,
  ): Promise<ExpenseTag> {
    return HttpService.api.post(`/v1/tags/tag/${tagId}/expenseTags`, values)
  }
}
