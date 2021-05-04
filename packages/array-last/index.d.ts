type ArrayWithLastType<Last> = [...unknown[], Last]

export default function last(arr: []): undefined
export default function last<Last>(arr: ArrayWithLastType<Last>): Last
export default function last<Last>(arr: ArrayWithLastType<Last> | []): Last | undefined