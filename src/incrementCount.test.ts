import { expect, test } from 'vitest'
import incrementCount from './incrementCount'

test('increments 1 to 2', () => {
  expect(incrementCount(1)).toEqual(2)
})
