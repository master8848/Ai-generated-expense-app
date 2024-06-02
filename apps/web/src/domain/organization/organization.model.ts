import { Project } from '../project'

import { Tag } from '../tag'

import { UserOrganization } from '../userOrganization'

export class Organization {
  id: string

  name?: string

  logoUrl?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  projects?: Project[]

  tags?: Tag[]

  userOrganizations?: UserOrganization[]
}
