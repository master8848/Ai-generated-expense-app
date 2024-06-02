import { Notification } from '../notification'

import { Expense } from '../expense'

import { UserOrganization } from '../userOrganization'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email?: string
  status: UserStatus
  name?: string
  pictureUrl?: string
  password?: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  expenses?: Expense[]

  userOrganizations?: UserOrganization[]
}
