type ReturnTrueValues = null | undefined | "" | [] | number | boolean | Symbol;
type ReturnFalseValues = string | any[];
type CheckValue = ReturnTrueValues | ReturnFalseValues | object;

declare function isEmpty<T extends CheckValue>(
  obj: T
): T extends ReturnTrueValues
  ? true
  : T extends ReturnFalseValues
  ? false
  : boolean;

export default isEmpty;
