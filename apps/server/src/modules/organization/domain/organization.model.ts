import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Project } from '../../../modules/project/domain'

import { Tag } from '../../../modules/tag/domain'

import { UserOrganization } from '../../../modules/userOrganization/domain'

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  logoUrl?: string

  @OneToMany(() => Project, child => child.organization)
  projects?: Project[]

  @OneToMany(() => Tag, child => child.organization)
  tags?: Tag[]

  @OneToMany(() => UserOrganization, child => child.organization)
  userOrganizations?: UserOrganization[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
