import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationProjectSubscriber } from './subscribers/notification.project.subscriber'

import { NotificationTagSubscriber } from './subscribers/notification.tag.subscriber'

import { NotificationOrganizationSubscriber } from './subscribers/notification.organization.subscriber'

import { NotificationExpenseSubscriber } from './subscribers/notification.expense.subscriber'

import { NotificationExpenseTagSubscriber } from './subscribers/notification.expenseTag.subscriber'

import { NotificationUserOrganizationSubscriber } from './subscribers/notification.userOrganization.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationProjectSubscriber,

    NotificationTagSubscriber,

    NotificationOrganizationSubscriber,

    NotificationExpenseSubscriber,

    NotificationExpenseTagSubscriber,

    NotificationUserOrganizationSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
