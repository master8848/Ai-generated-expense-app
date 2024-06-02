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
import { Tag, TagDomainFacade } from '@server/modules/tag/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TagApplicationEvent } from './tag.application.event'
import { TagCreateDto, TagUpdateDto } from './tag.dto'

@Controller('/v1/tags')
export class TagController {
  constructor(
    private eventService: EventService,
    private tagDomainFacade: TagDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.tagDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TagCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.tagDomainFacade.create(body)

    await this.eventService.emit<TagApplicationEvent.TagCreated.Payload>(
      TagApplicationEvent.TagCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:tagId')
  async findOne(@Param('tagId') tagId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.tagDomainFacade.findOneByIdOrFail(
      tagId,
      queryOptions,
    )

    return item
  }

  @Patch('/:tagId')
  async update(@Param('tagId') tagId: string, @Body() body: TagUpdateDto) {
    const item = await this.tagDomainFacade.findOneByIdOrFail(tagId)

    const itemUpdated = await this.tagDomainFacade.update(
      item,
      body as Partial<Tag>,
    )
    return itemUpdated
  }

  @Delete('/:tagId')
  async delete(@Param('tagId') tagId: string) {
    const item = await this.tagDomainFacade.findOneByIdOrFail(tagId)

    await this.tagDomainFacade.delete(item)

    return item
  }
}
