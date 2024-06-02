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
  Organization,
  OrganizationDomainFacade,
} from '@server/modules/organization/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { OrganizationApplicationEvent } from './organization.application.event'
import {
  OrganizationCreateDto,
  OrganizationUpdateDto,
} from './organization.dto'

@Controller('/v1/organizations')
export class OrganizationController {
  constructor(
    private eventService: EventService,
    private organizationDomainFacade: OrganizationDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.organizationDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: OrganizationCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.organizationDomainFacade.create(body)

    await this.eventService.emit<OrganizationApplicationEvent.OrganizationCreated.Payload>(
      OrganizationApplicationEvent.OrganizationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:organizationId')
  async findOne(
    @Param('organizationId') organizationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.organizationDomainFacade.findOneByIdOrFail(
      organizationId,
      queryOptions,
    )

    return item
  }

  @Patch('/:organizationId')
  async update(
    @Param('organizationId') organizationId: string,
    @Body() body: OrganizationUpdateDto,
  ) {
    const item =
      await this.organizationDomainFacade.findOneByIdOrFail(organizationId)

    const itemUpdated = await this.organizationDomainFacade.update(
      item,
      body as Partial<Organization>,
    )
    return itemUpdated
  }

  @Delete('/:organizationId')
  async delete(@Param('organizationId') organizationId: string) {
    const item =
      await this.organizationDomainFacade.findOneByIdOrFail(organizationId)

    await this.organizationDomainFacade.delete(item)

    return item
  }
}
