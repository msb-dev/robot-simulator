import { orientations, type Config, type Orientation } from './config/config'

type Command = 'REPORT' | 'MOVE' | 'LEFT' | 'RIGHT' | Config

export class InvalidInputError extends Error {
  constructor() {
    super('InvalidInputError')
  }
}

const parseOrientation = (input: string): Orientation => {
  const normalisedInput = input.toUpperCase()

  const orientation = orientations.find(
    (validOrientation) => validOrientation === normalisedInput
  )
  if (orientation) {
    return orientation
  } else {
    throw new InvalidInputError()
  }
}

const parsePlaceParameters = (p1: string, p2: string, p3: string): Config => {
  console.error('FFFFFFFFOOOOOOOOO', p1, p2, p3)
  const x = Number(p1)
  const y = Number(p2)
  if (Number.isNaN(x) || Number.isNaN(y)) {
    throw new InvalidInputError()
  }

  const f = parseOrientation(p3)

  return { x, y, f }
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
  }

  // The only remaining possible command is PLACE
  // Allow whitespace around parameters
  const matches = normalisedInput.match(
    /^(PLACE)\s*([\S^,]+)\s*,\s*([\S^,]+)\s*,\s*([\S^,]+)$/
  )

  if (matches === null) {
    throw new InvalidInputError()
  }

  return parsePlaceParameters(matches[2], matches[3], matches[4])
}
