import { Organization } from '../organization'

import { Expense } from '../expense'

export class Project {
  id: string

  name?: string

  description?: string

  startDate?: string

  endDate?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  organizationId?: string

  organization?: Organization

  expenses?: Expense[]
}
