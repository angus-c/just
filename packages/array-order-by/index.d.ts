type ValueGetter<T, Result = unknown> = (value: T) => Result;

type OrderParamField<T> = keyof T | ValueGetter<T>;

type OrderParam<T> = (
  | OrderParamField<T>
  | { field: OrderParamField<T>; order?: 'asc' | 'desc' }
);

declare function orderBy<T>(arr: T[], params?: [OrderParam<T>, ...OrderParam<T>[]]): T[];

export default orderBy;
