import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Tag } from './tag.model'

export class TagApi {
  static findMany(queryOptions?: ApiHelper.QueryOptions<Tag>): Promise<Tag[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tags${buildOptions}`)
  }

  static findOne(
    tagId: string,
    queryOptions?: ApiHelper.QueryOptions<Tag>,
  ): Promise<Tag> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tags/${tagId}${buildOptions}`)
  }

  static createOne(values: Partial<Tag>): Promise<Tag> {
    return HttpService.api.post(`/v1/tags`, values)
  }

  static updateOne(tagId: string, values: Partial<Tag>): Promise<Tag> {
    return HttpService.api.patch(`/v1/tags/${tagId}`, values)
  }

  static deleteOne(tagId: string): Promise<void> {
    return HttpService.api.delete(`/v1/tags/${tagId}`)
  }

  static findManyByOrganizationId(
    organizationId: string,
    queryOptions?: ApiHelper.QueryOptions<Tag>,
  ): Promise<Tag[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/organizations/organization/${organizationId}/tags${buildOptions}`,
    )
  }

  static createOneByOrganizationId(
    organizationId: string,
    values: Partial<Tag>,
  ): Promise<Tag> {
    return HttpService.api.post(
      `/v1/organizations/organization/${organizationId}/tags`,
      values,
    )
  }
}
