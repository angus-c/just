declare function
  flush<T extends Array<any> | object>(collection: T):
  T extends Array<any>
  ? T extends [...(infer E | null | undefined)[]]
  ? E[]
  : T
  : T extends { [key: string]: infer E | null | undefined }
  ? { [key: string]: E }
  : T

export default flush;
