export namespace TagApplicationEvent {
  export namespace TagCreated {
    export const key = 'tag.application.tag.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
