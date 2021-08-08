export default function permutations<First, Rest>(arr: [First, ...Rest[]]): (First | Rest)[][];
export default function permutations<T>(arr: T[]): T[]; // for empty arrays