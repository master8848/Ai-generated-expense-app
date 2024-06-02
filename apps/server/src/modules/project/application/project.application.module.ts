import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ProjectDomainModule } from '../domain'
import { ProjectController } from './project.controller'

import { OrganizationDomainModule } from '../../../modules/organization/domain'

import { ProjectByOrganizationController } from './projectByOrganization.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ProjectDomainModule,

    OrganizationDomainModule,
  ],
  controllers: [ProjectController, ProjectByOrganizationController],
  providers: [],
})
export class ProjectApplicationModule {}
