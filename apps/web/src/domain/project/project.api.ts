import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Project } from './project.model'

export class ProjectApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Project>,
  ): Promise<Project[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/projects${buildOptions}`)
  }

  static findOne(
    projectId: string,
    queryOptions?: ApiHelper.QueryOptions<Project>,
  ): Promise<Project> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/projects/${projectId}${buildOptions}`)
  }

  static createOne(values: Partial<Project>): Promise<Project> {
    return HttpService.api.post(`/v1/projects`, values)
  }

  static updateOne(
    projectId: string,
    values: Partial<Project>,
  ): Promise<Project> {
    return HttpService.api.patch(`/v1/projects/${projectId}`, values)
  }

  static deleteOne(projectId: string): Promise<void> {
    return HttpService.api.delete(`/v1/projects/${projectId}`)
  }

  static findManyByOrganizationId(
    organizationId: string,
    queryOptions?: ApiHelper.QueryOptions<Project>,
  ): Promise<Project[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/organizations/organization/${organizationId}/projects${buildOptions}`,
    )
  }

  static createOneByOrganizationId(
    organizationId: string,
    values: Partial<Project>,
  ): Promise<Project> {
    return HttpService.api.post(
      `/v1/organizations/organization/${organizationId}/projects`,
      values,
    )
  }
}
