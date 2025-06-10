import { describe, expect, it } from 'vitest'
import { left, right } from './commands'
import type { Orientation } from '../config/config'

type OrientationPair = {
  startOrientation: Orientation
  endOrientation: Orientation
}

describe('left', () => {
  const configBase = { x: 1, y: 2 }
  it.each`
    startOrientation | endOrientation
    ${'NORTH'}       | ${'WEST'}
    ${'EAST'}        | ${'NORTH'}
    ${'SOUTH'}       | ${'EAST'}
    ${'WEST'}        | ${'SOUTH'}
  `(
    'should turn $startOrientation into $endOrientation',
    ({ startOrientation, endOrientation }: OrientationPair) => {
      expect(left({ ...configBase, f: startOrientation }).f).toEqual(
        endOrientation
      )
    }
  )
})

describe('right', () => {
  const configBase = { x: 1, y: 2 }
  it.each`
    startOrientation | endOrientation
    ${'NORTH'}       | ${'EAST'}
    ${'EAST'}        | ${'SOUTH'}
    ${'SOUTH'}       | ${'WEST'}
    ${'WEST'}        | ${'NORTH'}
  `(
    'should turn $startOrientation into $endOrientation',
    ({ startOrientation, endOrientation }: OrientationPair) => {
      expect(right({ ...configBase, f: startOrientation }).f).toEqual(
        endOrientation
      )
    }
  )
})
