import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { UserOrganization } from './userOrganization.model'

export class UserOrganizationApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<UserOrganization>,
  ): Promise<UserOrganization[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/userOrganizations${buildOptions}`)
  }

  static findOne(
    userOrganizationId: string,
    queryOptions?: ApiHelper.QueryOptions<UserOrganization>,
  ): Promise<UserOrganization> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/userOrganizations/${userOrganizationId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<UserOrganization>,
  ): Promise<UserOrganization> {
    return HttpService.api.post(`/v1/userOrganizations`, values)
  }

  static updateOne(
    userOrganizationId: string,
    values: Partial<UserOrganization>,
  ): Promise<UserOrganization> {
    return HttpService.api.patch(
      `/v1/userOrganizations/${userOrganizationId}`,
      values,
    )
  }

  static deleteOne(userOrganizationId: string): Promise<void> {
    return HttpService.api.delete(`/v1/userOrganizations/${userOrganizationId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<UserOrganization>,
  ): Promise<UserOrganization[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/userOrganizations${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<UserOrganization>,
  ): Promise<UserOrganization> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/userOrganizations`,
      values,
    )
  }

  static findManyByOrganizationId(
    organizationId: string,
    queryOptions?: ApiHelper.QueryOptions<UserOrganization>,
  ): Promise<UserOrganization[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/organizations/organization/${organizationId}/userOrganizations${buildOptions}`,
    )
  }

  static createOneByOrganizationId(
    organizationId: string,
    values: Partial<UserOrganization>,
  ): Promise<UserOrganization> {
    return HttpService.api.post(
      `/v1/organizations/organization/${organizationId}/userOrganizations`,
      values,
    )
  }
}
