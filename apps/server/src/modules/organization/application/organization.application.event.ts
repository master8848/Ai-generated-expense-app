export namespace OrganizationApplicationEvent {
  export namespace OrganizationCreated {
    export const key = 'organization.application.organization.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
