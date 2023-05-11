type Options = {
  shuffleAll: boolean
}

export default function shuffle<T>(arr: readonly T[], options?: Options): T[]
