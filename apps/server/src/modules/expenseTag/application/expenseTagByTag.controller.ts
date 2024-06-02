import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ExpenseTagDomainFacade } from '@server/modules/expenseTag/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ExpenseTagApplicationEvent } from './expenseTag.application.event'
import { ExpenseTagCreateDto } from './expenseTag.dto'

import { TagDomainFacade } from '../../tag/domain'

@Controller('/v1/tags')
export class ExpenseTagByTagController {
  constructor(
    private tagDomainFacade: TagDomainFacade,

    private expenseTagDomainFacade: ExpenseTagDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/tag/:tagId/expenseTags')
  async findManyTagId(@Param('tagId') tagId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.tagDomainFacade.findOneByIdOrFail(tagId)

    const items = await this.expenseTagDomainFacade.findManyByTag(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/tag/:tagId/expenseTags')
  async createByTagId(
    @Param('tagId') tagId: string,
    @Body() body: ExpenseTagCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, tagId }

    const item = await this.expenseTagDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ExpenseTagApplicationEvent.ExpenseTagCreated.Payload>(
      ExpenseTagApplicationEvent.ExpenseTagCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
