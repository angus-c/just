declare function demethodize<Entity, MethodName extends keyof Entity>(
  method: Entity[MethodName] & Function
): Entity[MethodName] extends (...p: any[]) => any
  ? (
      p: Entity,
      ...args: Parameters<Entity[MethodName]>
    ) => ReturnType<Entity[MethodName]>
  : never;
declare function demethodize<Entity, Params extends any[], Returns>(
  method: (...p: Params) => Returns
): (p: Entity, ...a: Params) => Returns;

export default demethodize;
