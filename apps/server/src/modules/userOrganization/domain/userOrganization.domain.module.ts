import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { UserOrganizationDomainFacade } from './userOrganization.domain.facade'
import { UserOrganization } from './userOrganization.model'

@Module({
  imports: [TypeOrmModule.forFeature([UserOrganization]), DatabaseHelperModule],
  providers: [UserOrganizationDomainFacade, UserOrganizationDomainFacade],
  exports: [UserOrganizationDomainFacade],
})
export class UserOrganizationDomainModule {}
