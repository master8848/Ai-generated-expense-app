import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ProjectDomainFacade } from '@server/modules/project/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ProjectApplicationEvent } from './project.application.event'
import { ProjectCreateDto } from './project.dto'

import { OrganizationDomainFacade } from '../../organization/domain'

@Controller('/v1/organizations')
export class ProjectByOrganizationController {
  constructor(
    private organizationDomainFacade: OrganizationDomainFacade,

    private projectDomainFacade: ProjectDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/organization/:organizationId/projects')
  async findManyOrganizationId(
    @Param('organizationId') organizationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.organizationDomainFacade.findOneByIdOrFail(organizationId)

    const items = await this.projectDomainFacade.findManyByOrganization(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/organization/:organizationId/projects')
  async createByOrganizationId(
    @Param('organizationId') organizationId: string,
    @Body() body: ProjectCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, organizationId }

    const item = await this.projectDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ProjectApplicationEvent.ProjectCreated.Payload>(
      ProjectApplicationEvent.ProjectCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
