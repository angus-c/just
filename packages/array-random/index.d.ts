declare function random<Head, Rest>(arr: [Head, ...Rest[]]): Head | Rest;
declare function random<T>(arr: readonly T[]): T | undefined;
export default random;
