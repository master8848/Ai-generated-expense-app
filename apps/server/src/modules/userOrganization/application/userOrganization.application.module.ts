import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { UserOrganizationDomainModule } from '../domain'
import { UserOrganizationController } from './userOrganization.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { UserOrganizationByUserController } from './userOrganizationByUser.controller'

import { OrganizationDomainModule } from '../../../modules/organization/domain'

import { UserOrganizationByOrganizationController } from './userOrganizationByOrganization.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    UserOrganizationDomainModule,

    UserDomainModule,

    OrganizationDomainModule,
  ],
  controllers: [
    UserOrganizationController,

    UserOrganizationByUserController,

    UserOrganizationByOrganizationController,
  ],
  providers: [],
})
export class UserOrganizationApplicationModule {}
