import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { UserOrganizationDomainFacade } from '@server/modules/userOrganization/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UserOrganizationApplicationEvent } from './userOrganization.application.event'
import { UserOrganizationCreateDto } from './userOrganization.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class UserOrganizationByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private userOrganizationDomainFacade: UserOrganizationDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/userOrganizations')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.userOrganizationDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/userOrganizations')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: UserOrganizationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
