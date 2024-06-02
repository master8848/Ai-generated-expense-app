import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TagDomainFacade } from '@server/modules/tag/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TagApplicationEvent } from './tag.application.event'
import { TagCreateDto } from './tag.dto'

import { OrganizationDomainFacade } from '../../organization/domain'

@Controller('/v1/organizations')
export class TagByOrganizationController {
  constructor(
    private organizationDomainFacade: OrganizationDomainFacade,

    private tagDomainFacade: TagDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/organization/:organizationId/tags')
  async findManyOrganizationId(
    @Param('organizationId') organizationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.organizationDomainFacade.findOneByIdOrFail(organizationId)

    const items = await this.tagDomainFacade.findManyByOrganization(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/organization/:organizationId/tags')
  async createByOrganizationId(
    @Param('organizationId') organizationId: string,
    @Body() body: TagCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, organizationId }

    const item = await this.tagDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TagApplicationEvent.TagCreated.Payload>(
      TagApplicationEvent.TagCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
