export namespace UserOrganizationApplicationEvent {
  export namespace UserOrganizationCreated {
    export const key = 'userOrganization.application.userOrganization.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
