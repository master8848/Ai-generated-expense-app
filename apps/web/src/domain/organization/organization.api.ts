import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Organization } from './organization.model'

export class OrganizationApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Organization>,
  ): Promise<Organization[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/organizations${buildOptions}`)
  }

  static findOne(
    organizationId: string,
    queryOptions?: ApiHelper.QueryOptions<Organization>,
  ): Promise<Organization> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/organizations/${organizationId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Organization>): Promise<Organization> {
    return HttpService.api.post(`/v1/organizations`, values)
  }

  static updateOne(
    organizationId: string,
    values: Partial<Organization>,
  ): Promise<Organization> {
    return HttpService.api.patch(`/v1/organizations/${organizationId}`, values)
  }

  static deleteOne(organizationId: string): Promise<void> {
    return HttpService.api.delete(`/v1/organizations/${organizationId}`)
  }
}
