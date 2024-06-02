import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ExpenseDomainModule } from '../domain'
import { ExpenseController } from './expense.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ExpenseByUserController } from './expenseByUser.controller'

import { ProjectDomainModule } from '../../../modules/project/domain'

import { ExpenseByProjectController } from './expenseByProject.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ExpenseDomainModule,

    UserDomainModule,

    ProjectDomainModule,
  ],
  controllers: [
    ExpenseController,

    ExpenseByUserController,

    ExpenseByProjectController,
  ],
  providers: [],
})
export class ExpenseApplicationModule {}
