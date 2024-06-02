import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { ProjectApplicationModule } from './project/application'

import { TagApplicationModule } from './tag/application'

import { OrganizationApplicationModule } from './organization/application'

import { ExpenseApplicationModule } from './expense/application'

import { ExpenseTagApplicationModule } from './expenseTag/application'

import { UserOrganizationApplicationModule } from './userOrganization/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    ProjectApplicationModule,

    TagApplicationModule,

    OrganizationApplicationModule,

    ExpenseApplicationModule,

    ExpenseTagApplicationModule,

    UserOrganizationApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
