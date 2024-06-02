import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { OrganizationDomainFacade } from './organization.domain.facade'
import { Organization } from './organization.model'

@Module({
  imports: [TypeOrmModule.forFeature([Organization]), DatabaseHelperModule],
  providers: [OrganizationDomainFacade, OrganizationDomainFacade],
  exports: [OrganizationDomainFacade],
})
export class OrganizationDomainModule {}
