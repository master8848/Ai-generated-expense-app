import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { ProjectApi } from './project/project.api'

import { TagApi } from './tag/tag.api'

import { OrganizationApi } from './organization/organization.api'

import { ExpenseApi } from './expense/expense.api'

import { ExpenseTagApi } from './expenseTag/expenseTag.api'

import { UserOrganizationApi } from './userOrganization/userOrganization.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Project extends ProjectApi {}

  export class Tag extends TagApi {}

  export class Organization extends OrganizationApi {}

  export class Expense extends ExpenseApi {}

  export class ExpenseTag extends ExpenseTagApi {}

  export class UserOrganization extends UserOrganizationApi {}
}
