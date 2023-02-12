type ValueGetter<T, Result = unknown> = (value: T) => Result;

type OrderParamProperty<T> = keyof T | ValueGetter<T>;

type OrderParam<T> = {
  property: OrderParamProperty<T>;
  order?: 'asc' | 'desc';
};

declare function orderBy<T>(
  arr: T[],
  params?: [OrderParam<T>, ...OrderParam<T>[]]
): T[];

export default orderBy;
