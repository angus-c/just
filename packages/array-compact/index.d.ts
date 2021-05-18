// NaN and document.all are also falsy but they cannot be represented as a type
type Falsy = false | null | undefined | '' | 0 | 0n;

// return type has
export default function compact<T>(arr: (Falsy | T)[]): T[];