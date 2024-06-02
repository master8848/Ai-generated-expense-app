import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  UserOrganization,
  UserOrganizationDomainFacade,
} from '@server/modules/userOrganization/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { UserOrganizationApplicationEvent } from './userOrganization.application.event'
import {
  UserOrganizationCreateDto,
  UserOrganizationUpdateDto,
} from './userOrganization.dto'

@Controller('/v1/userOrganizations')
export class UserOrganizationController {
  constructor(
    private eventService: EventService,
    private userOrganizationDomainFacade: UserOrganizationDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.userOrganizationDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: UserOrganizationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.userOrganizationDomainFacade.create(body)

    await this.eventService.emit<UserOrganizationApplicationEvent.UserOrganizationCreated.Payload>(
      UserOrganizationApplicationEvent.UserOrganizationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:userOrganizationId')
  async findOne(
    @Param('userOrganizationId') userOrganizationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.userOrganizationDomainFacade.findOneByIdOrFail(
      userOrganizationId,
      queryOptions,
    )

    return item
  }

  @Patch('/:userOrganizationId')
  async update(
    @Param('userOrganizationId') userOrganizationId: string,
    @Body() body: UserOrganizationUpdateDto,
  ) {
    const item =
      await this.userOrganizationDomainFacade.findOneByIdOrFail(
        userOrganizationId,
      )

    const itemUpdated = await this.userOrganizationDomainFacade.update(
      item,
      body as Partial<UserOrganization>,
    )
    return itemUpdated
  }

  @Delete('/:userOrganizationId')
  async delete(@Param('userOrganizationId') userOrganizationId: string) {
    const item =
      await this.userOrganizationDomainFacade.findOneByIdOrFail(
        userOrganizationId,
      )

    await this.userOrganizationDomainFacade.delete(item)

    return item
  }
}
