import { describe, it, expect } from 'vitest'
import { validateConfig, type Config } from './config'

describe('validateConfig', () => {
  it('should not throw an error if the specified config is within bounds', () => {
    const validConfig: Config = { x: 1, y: 2, f: 'NORTH' }
    expect(() => {
      validateConfig(validConfig)
    }).not.toThrow()
  })

  it('should throw an error when the config is out of bounds in the x direction', () => {
    const invalidConfig: Config = { x: 5, y: 2, f: 'NORTH' }
    expect(() => {
      validateConfig(invalidConfig)
    }).toThrow()
  })

  it('should throw an error when the config is out of bounds in the y direction', () => {
    const invalidConfig: Config = { x: 3, y: 5, f: 'NORTH' }
    expect(() => {
      validateConfig(invalidConfig)
    }).toThrow()
  })

  it('should thrown an error when the config contains a non-integer x coordinate', () => {
    const invalidConfig: Config = { x: 3.2, y: 4, f: 'NORTH' }
    expect(() => {
      validateConfig(invalidConfig)
    }).toThrow()
  })

  it('should thrown an error when the config contains a non-integer y coordinate', () => {
    const invalidConfig: Config = { x: 3.2, y: 4, f: 'NORTH' }
    expect(() => {
      validateConfig(invalidConfig)
    }).toThrow()
  })

  it('should thrown an error when the config contains a negative x coordinate', () => {
    const invalidConfig: Config = { x: -1, y: 4, f: 'NORTH' }
    expect(() => {
      validateConfig(invalidConfig)
    }).toThrow()
  })

  it('should thrown an error when the config contains a negative y coordinate', () => {
    const invalidConfig: Config = { x: 1, y: -4, f: 'NORTH' }
    expect(() => {
      validateConfig(invalidConfig)
    }).toThrow()
  })
})
