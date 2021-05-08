type Options = {
  shuffleAll: boolean
}

export default function shuffle<T>(arr: T[], options?: Options): T[]