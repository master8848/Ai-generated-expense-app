import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { OrganizationDomainModule } from '../domain'
import { OrganizationController } from './organization.controller'

@Module({
  imports: [AuthenticationDomainModule, OrganizationDomainModule],
  controllers: [OrganizationController],
  providers: [],
})
export class OrganizationApplicationModule {}
