import { Organization } from '../organization'

import { ExpenseTag } from '../expenseTag'

export class Tag {
  id: string

  name?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  organizationId?: string

  organization?: Organization

  expenseTags?: ExpenseTag[]
}
