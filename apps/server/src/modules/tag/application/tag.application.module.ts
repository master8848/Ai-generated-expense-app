import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TagDomainModule } from '../domain'
import { TagController } from './tag.controller'

import { OrganizationDomainModule } from '../../../modules/organization/domain'

import { TagByOrganizationController } from './tagByOrganization.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TagDomainModule,

    OrganizationDomainModule,
  ],
  controllers: [TagController, TagByOrganizationController],
  providers: [],
})
export class TagApplicationModule {}
