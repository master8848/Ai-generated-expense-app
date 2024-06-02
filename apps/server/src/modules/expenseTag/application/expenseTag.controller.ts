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
  ExpenseTag,
  ExpenseTagDomainFacade,
} from '@server/modules/expenseTag/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ExpenseTagApplicationEvent } from './expenseTag.application.event'
import { ExpenseTagCreateDto, ExpenseTagUpdateDto } from './expenseTag.dto'

@Controller('/v1/expenseTags')
export class ExpenseTagController {
  constructor(
    private eventService: EventService,
    private expenseTagDomainFacade: ExpenseTagDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.expenseTagDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ExpenseTagCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.expenseTagDomainFacade.create(body)

    await this.eventService.emit<ExpenseTagApplicationEvent.ExpenseTagCreated.Payload>(
      ExpenseTagApplicationEvent.ExpenseTagCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:expenseTagId')
  async findOne(
    @Param('expenseTagId') expenseTagId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.expenseTagDomainFacade.findOneByIdOrFail(
      expenseTagId,
      queryOptions,
    )

    return item
  }

  @Patch('/:expenseTagId')
  async update(
    @Param('expenseTagId') expenseTagId: string,
    @Body() body: ExpenseTagUpdateDto,
  ) {
    const item =
      await this.expenseTagDomainFacade.findOneByIdOrFail(expenseTagId)

    const itemUpdated = await this.expenseTagDomainFacade.update(
      item,
      body as Partial<ExpenseTag>,
    )
    return itemUpdated
  }

  @Delete('/:expenseTagId')
  async delete(@Param('expenseTagId') expenseTagId: string) {
    const item =
      await this.expenseTagDomainFacade.findOneByIdOrFail(expenseTagId)

    await this.expenseTagDomainFacade.delete(item)

    return item
  }
}
