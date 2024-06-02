import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Project as ProjectModel } from './project/project.model'

import { Tag as TagModel } from './tag/tag.model'

import { Organization as OrganizationModel } from './organization/organization.model'

import { Expense as ExpenseModel } from './expense/expense.model'

import { ExpenseTag as ExpenseTagModel } from './expenseTag/expenseTag.model'

import { UserOrganization as UserOrganizationModel } from './userOrganization/userOrganization.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Project extends ProjectModel {}

  export class Tag extends TagModel {}

  export class Organization extends OrganizationModel {}

  export class Expense extends ExpenseModel {}

  export class ExpenseTag extends ExpenseTagModel {}

  export class UserOrganization extends UserOrganizationModel {}
}
