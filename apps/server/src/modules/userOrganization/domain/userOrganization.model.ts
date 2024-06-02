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

import { User } from '../../../modules/user/domain'

import { Organization } from '../../../modules/organization/domain'

@Entity()
export class UserOrganization {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  role?: string

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.userOrganizations)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({ nullable: true })
  organizationId?: string

  @ManyToOne(() => Organization, parent => parent.userOrganizations)
  @JoinColumn({ name: 'organizationId' })
  organization?: Organization

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
