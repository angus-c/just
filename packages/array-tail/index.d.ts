export default function tail<Tail>(arr: [unknown, ...Tail[]]): Tail[]
export default function tail<T>(arr: T[]): T[]

export default function tail<T>(arr: [unknown, ...T[]] | T[]): T[]