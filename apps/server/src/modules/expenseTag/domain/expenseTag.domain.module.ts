import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ExpenseTagDomainFacade } from './expenseTag.domain.facade'
import { ExpenseTag } from './expenseTag.model'

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseTag]), DatabaseHelperModule],
  providers: [ExpenseTagDomainFacade, ExpenseTagDomainFacade],
  exports: [ExpenseTagDomainFacade],
})
export class ExpenseTagDomainModule {}
