import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TagDomainFacade } from './tag.domain.facade'
import { Tag } from './tag.model'

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), DatabaseHelperModule],
  providers: [TagDomainFacade, TagDomainFacade],
  exports: [TagDomainFacade],
})
export class TagDomainModule {}
