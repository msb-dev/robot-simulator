import { describe, expect, it } from 'vitest'
import { left } from './commands'
import type { Orientation } from '../config/config'

describe('left', () => {
  const configBase = { x: 1, y: 2 }
  //   it('should turn NORTH into WEST', () => {
  //     expect(left({ ...configBase, f: 'NORTH' }).f).toEqual('WEST')
  //   })
  //   it('should turn EAST into NORTH', () => {
  //     expect(left({ ...configBase, f: 'EAST' }).f).toEqual('WESTS')
  //   })
  it.each`
    startOrientation | endOrientation
    ${'NORTH'}       | ${'WEST'}
    ${'EAST'}        | ${'NORTH'}
    ${'SOUTH'}       | ${'EAST'}
    ${'WEST'}        | ${'SOUTH'}
  `(
    'should turn $startOrientation into $endOrientation',
    ({ startOrientation, endOrientation }) => {
      expect(left({ ...configBase, f: startOrientation }).f).toEqual(
        endOrientation
      )
    }
  )
})
