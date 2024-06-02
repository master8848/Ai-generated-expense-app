import { User } from '../user'

import { Project } from '../project'

import { ExpenseTag } from '../expenseTag'

export class Expense {
  id: string

  amount?: number

  description?: string

  date?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  userId?: string

  user?: User

  projectId?: string

  project?: Project

  expenseTags?: ExpenseTag[]
}
