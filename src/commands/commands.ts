import { type Config, orientations } from '../config/config'

export const left = (config: Config): Config => {
  // Because f is an orientation, we know that it MUST be found in orientations, even it TypeScript doesn't know this!
  const currentOrientationIndex = orientations.indexOf(config.f)

  const newIndex =
    currentOrientationIndex === 0
      ? orientations.length - 1
      : currentOrientationIndex - 1

  return { ...config, f: orientations[newIndex] }
}
