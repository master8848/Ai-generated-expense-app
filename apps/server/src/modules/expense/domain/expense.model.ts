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

import { Project } from '../../../modules/project/domain'

import { ExpenseTag } from '../../../modules/expenseTag/domain'

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  amount?: number

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  date?: string

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.expenses)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({ nullable: true })
  projectId?: string

  @ManyToOne(() => Project, parent => parent.expenses)
  @JoinColumn({ name: 'projectId' })
  project?: Project

  @OneToMany(() => ExpenseTag, child => child.expense)
  expenseTags?: ExpenseTag[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
