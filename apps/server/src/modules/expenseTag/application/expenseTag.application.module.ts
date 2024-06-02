import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ExpenseTagDomainModule } from '../domain'
import { ExpenseTagController } from './expenseTag.controller'

import { ExpenseDomainModule } from '../../../modules/expense/domain'

import { ExpenseTagByExpenseController } from './expenseTagByExpense.controller'

import { TagDomainModule } from '../../../modules/tag/domain'

import { ExpenseTagByTagController } from './expenseTagByTag.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ExpenseTagDomainModule,

    ExpenseDomainModule,

    TagDomainModule,
  ],
  controllers: [
    ExpenseTagController,

    ExpenseTagByExpenseController,

    ExpenseTagByTagController,
  ],
  providers: [],
})
export class ExpenseTagApplicationModule {}
