import { User } from '../user'

import { Organization } from '../organization'

export class UserOrganization {
  id: string

  role?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  userId?: string

  user?: User

  organizationId?: string

  organization?: Organization
}
