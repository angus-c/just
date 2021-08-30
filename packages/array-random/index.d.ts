export default function random<Head, Rest>(arr: [Head, ...Rest[]]): Head | Rest;
export default function random<T>(arr: T[]): undefined; // return undefined for empty arrays.
