import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { UserOrganizationDomainFacade } from '@server/modules/userOrganization/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UserOrganizationApplicationEvent } from './userOrganization.application.event'
import { UserOrganizationCreateDto } from './userOrganization.dto'

import { OrganizationDomainFacade } from '../../organization/domain'

@Controller('/v1/organizations')
export class UserOrganizationByOrganizationController {
  constructor(
    private organizationDomainFacade: OrganizationDomainFacade,

    private userOrganizationDomainFacade: UserOrganizationDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/organization/:organizationId/userOrganizations')
  async findManyOrganizationId(
    @Param('organizationId') organizationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.organizationDomainFacade.findOneByIdOrFail(organizationId)

    const items =
      await this.userOrganizationDomainFacade.findManyByOrganization(
        parent,
        queryOptions,
      )

    return items
  }

  @Post('/organization/:organizationId/userOrganizations')
  async createByOrganizationId(
    @Param('organizationId') organizationId: string,
    @Body() body: UserOrganizationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, organizationId }

    const item = await this.userOrganizationDomainFacade.create(valuesUpdated)

    await this.eventService.emit<UserOrganizationApplicationEvent.UserOrganizationCreated.Payload>(
      UserOrganizationApplicationEvent.UserOrganizationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
