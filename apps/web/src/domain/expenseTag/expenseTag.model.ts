import { Expense } from '../expense'

import { Tag } from '../tag'

export class ExpenseTag {
  id: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  expenseId?: string

  expense?: Expense

  tagId?: string

  tag?: Tag
}
