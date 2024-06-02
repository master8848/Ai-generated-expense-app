import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { ProjectDomainModule } from './project/domain'

import { TagDomainModule } from './tag/domain'

import { OrganizationDomainModule } from './organization/domain'

import { ExpenseDomainModule } from './expense/domain'

import { ExpenseTagDomainModule } from './expenseTag/domain'

import { UserOrganizationDomainModule } from './userOrganization/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    ProjectDomainModule,

    TagDomainModule,

    OrganizationDomainModule,

    ExpenseDomainModule,

    ExpenseTagDomainModule,

    UserOrganizationDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
