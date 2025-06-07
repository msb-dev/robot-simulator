export type Orientation = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST'

export interface Config {
  x: number
  y: number
  f: Orientation
}

const minBound = 0
const maxBound = 4

export class NonIntegerCoordinateError extends Error {
  constructor() {
    super('NonIntegerCoordinateError')
  }
}

export class OutOfBoundCoordinateError extends Error {
  constructor() {
    super('OutOfBoundCoordinateError')
  }
}

export const validateConfig = (config: Config) => {
  if (!Number.isInteger(config.x) || !Number.isInteger(config.y)) {
    throw new NonIntegerCoordinateError()
  }
  if (
    config.x < minBound ||
    config.y < minBound ||
    config.x > maxBound ||
    config.y > maxBound
  ) {
    throw new OutOfBoundCoordinateError()
  }
}
