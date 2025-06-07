import type { Config } from './commands/commands'

type Command = 'REPORT' | 'MOVE' | 'LEFT' | 'RIGHT' | Config

class InvalidInputError extends Error {
  constructor() {
    super('InvalidInputError')
  }
}

const parsePlaceParemeters = (p1: string, p2: string, p3: string) => {
  const x = Number(p1)
  const y = Number(p2)
  if (Number.isNaN(x)) {
    throw new InvalidInputError()
  }
}

export const parseInput = (input: string): Command => {
  /*
  I thought about doing this with patterns like this
  
  /^\s*REPORT\s*$/i

  to twim whitespace and ignore case, but I felt this makes things less clear. We're not in a situation where performance is key.
  */

  const normalisedInput = input.trim().toUpperCase()

  if (/^REPORT$/.test(normalisedInput)) {
    return 'REPORT'
  } else if (/^MOVE$/.test(normalisedInput)) {
    return 'MOVE'
  } else if (/^LEFT$/.test(normalisedInput)) {
    return 'LEFT'
  } else if (/^RIGHT$/.test(normalisedInput)) {
    return 'RIGHT'
  } else if (/^PLACE$/.test(normalisedInput)) {
    return 'MOVE'
  } else {
    throw new InvalidInputError()
  }
}
