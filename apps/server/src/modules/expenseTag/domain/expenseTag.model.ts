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

import { Expense } from '../../../modules/expense/domain'

import { Tag } from '../../../modules/tag/domain'

@Entity()
export class ExpenseTag {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  expenseId?: string

  @ManyToOne(() => Expense, parent => parent.expenseTags)
  @JoinColumn({ name: 'expenseId' })
  expense?: Expense

  @Column({ nullable: true })
  tagId?: string

  @ManyToOne(() => Tag, parent => parent.expenseTags)
  @JoinColumn({ name: 'tagId' })
  tag?: Tag

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
