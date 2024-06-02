import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ExpenseTagDomainFacade } from '@server/modules/expenseTag/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ExpenseTagApplicationEvent } from './expenseTag.application.event'
import { ExpenseTagCreateDto } from './expenseTag.dto'

import { ExpenseDomainFacade } from '../../expense/domain'

@Controller('/v1/expenses')
export class ExpenseTagByExpenseController {
  constructor(
    private expenseDomainFacade: ExpenseDomainFacade,

    private expenseTagDomainFacade: ExpenseTagDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/expense/:expenseId/expenseTags')
  async findManyExpenseId(
    @Param('expenseId') expenseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.expenseDomainFacade.findOneByIdOrFail(expenseId)

    const items = await this.expenseTagDomainFacade.findManyByExpense(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/expense/:expenseId/expenseTags')
  async createByExpenseId(
    @Param('expenseId') expenseId: string,
    @Body() body: ExpenseTagCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, expenseId }

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
