export namespace ExpenseTagApplicationEvent {
  export namespace ExpenseTagCreated {
    export const key = 'expenseTag.application.expenseTag.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
