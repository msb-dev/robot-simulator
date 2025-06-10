import { type Config, orientations, validateConfig } from '../config/config'

export const left = (config: Config): Config => {
  // Because f is an orientation, we know that it MUST be found in orientations, even it TypeScript doesn't know this!
  const currentOrientationIndex = orientations.indexOf(config.f)

  const newIndex =
    currentOrientationIndex === 0
      ? orientations.length - 1
      : currentOrientationIndex - 1

  return { ...config, f: orientations[newIndex] }
}

export const right = (config: Config): Config => {
  // Because f is an orientation, we know that it MUST be found in orientations, even it TypeScript doesn't know this!
  const currentOrientationIndex = orientations.indexOf(config.f)

  const newIndex =
    currentOrientationIndex === orientations.length - 1
      ? 0
      : currentOrientationIndex + 1

  return { ...config, f: orientations[newIndex] }
}

export const move = (config: Config): Config => {
  let newConfig: Config
  switch (config.f) {
    case 'NORTH':
      newConfig = { ...config, y: config.y + 1 }
      break
    case 'EAST':
      newConfig = { ...config, x: config.x + 1 }
      break
    case 'SOUTH':
      newConfig = { ...config, y: config.y - 1 }
      break
    case 'WEST':
      newConfig = { ...config, x: config.x - 1 }
      break
  }
  validateConfig(newConfig)
  return newConfig
}
