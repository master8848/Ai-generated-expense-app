import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ExpenseDomainFacade } from '@server/modules/expense/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ExpenseApplicationEvent } from './expense.application.event'
import { ExpenseCreateDto } from './expense.dto'

import { ProjectDomainFacade } from '../../project/domain'

@Controller('/v1/projects')
export class ExpenseByProjectController {
  constructor(
    private projectDomainFacade: ProjectDomainFacade,

    private expenseDomainFacade: ExpenseDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/project/:projectId/expenses')
  async findManyProjectId(
    @Param('projectId') projectId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.projectDomainFacade.findOneByIdOrFail(projectId)

    const items = await this.expenseDomainFacade.findManyByProject(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/project/:projectId/expenses')
  async createByProjectId(
    @Param('projectId') projectId: string,
    @Body() body: ExpenseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, projectId }

    const item = await this.expenseDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ExpenseApplicationEvent.ExpenseCreated.Payload>(
      ExpenseApplicationEvent.ExpenseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
