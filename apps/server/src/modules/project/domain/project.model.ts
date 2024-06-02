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

import { Expense } from '../../../modules/expense/domain'

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  startDate?: string

  @Column({ nullable: true })
  endDate?: string

  @Column({ nullable: true })
  organizationId?: string

  @ManyToOne(() => Organization, parent => parent.projects)
  @JoinColumn({ name: 'organizationId' })
  organization?: Organization

  @OneToMany(() => Expense, child => child.project)
  expenses?: Expense[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
