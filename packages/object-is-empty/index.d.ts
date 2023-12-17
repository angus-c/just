type ReturnTrueValues = null | undefined | "" | [] | number | boolean | Symbol;
type CheckValue = ReturnTrueValues | object | string | any[];

declare function isEmpty<T extends CheckValue>(
  obj: T
): T extends ReturnTrueValues
  ? true
  : boolean;

export default isEmpty;
