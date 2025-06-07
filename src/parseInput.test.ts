import { describe, it, expect } from 'vitest'
import { parseInput } from './parseInput'

describe('parseInput', () => {
  it('should parse REPORT correctly with leading and trailing whitespace and mixed case', () => {
    expect(parseInput('   rEPOrt   ')).toBe('REPORT')
  })
  it('should parse LEFT correctly with leading and trailing whitespace and mixed case', () => {
    expect(parseInput('   LefT   ')).toBe('LEFT')
  })
  it('should parse RIGHT correctly with leading and trailing whitespace and mixed case', () => {
    expect(parseInput('   rIGHt   ')).toBe('RIGHT')
  })
  it('should parse MOVE correctly with leading and trailing whitespace and mixed case', () => {
    expect(parseInput('   MOVe   ')).toBe('MOVE')
  })
  it('should throw an error when the input is not a recognised command', () => {
    expect(() => parseInput('MOVE FOO')).toThrow()
  })
  describe('when given a PLACE command', () => {
    it('should parse it correctly to a Config (though not necessarily a valid Config) if the parameters are the right types', () => {
      expect(parseInput('    pLACe 1.2,   -2.4  , nOrTH     ')).toEqual({
        x: 1,
        y: -2.4,
        f: 'NORTH',
      })
    })
    it('should throw an error if there are fewer than 3 parameters', () => {
      expect(() => parseInput('PLACE 1.2,-2.4')).toThrow()
    })
    it('should throw an error if there are fewer than 3 parameters with a trailing comma', () => {
      expect(() => parseInput('PLACE 1.2,-2.4,')).toThrow()
    })
    it('should throw an error if there are more than 3 parameters', () => {
      expect(() => parseInput('PLACE 1.2,-2.4,NORTH,EAST')).toThrow()
    })
    it('should throw an error if there are no parameters', () => {
      expect(() => parseInput('PLACE')).toThrow()
    })
    it('should throw an error if the x coordinate does not parse to a number', () => {
      expect(() => parseInput('PLACE g1.2,-2.4,NORTH')).toThrow()
    })
    it('should throw an error if the y coordinate does not parse to a number', () => {
      expect(() => parseInput('PLACE 1.2,p-2.4,NORTH')).toThrow()
    })
    it('should throw an error if the orientation does not match a cardinal direction', () => {
      expect(() => parseInput('PLACE 1.2,-2.4,NORTHEAST')).toThrow()
    })
  })
})
