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

import { Organization } from '../../../modules/organization/domain'

import { ExpenseTag } from '../../../modules/expenseTag/domain'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  organizationId?: string

  @ManyToOne(() => Organization, parent => parent.tags)
  @JoinColumn({ name: 'organizationId' })
  organization?: Organization

  @OneToMany(() => ExpenseTag, child => child.tag)
  expenseTags?: ExpenseTag[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
