import { useState } from 'react'
import robotLogo from '/robot.svg'
import './App.css'
import {
  validateConfig,
  type Config,
  NonIntegerCoordinateError,
  OutOfBoundCoordinateError,
} from './config/config'
import { InvalidInputError, parseInput } from './parseInput'
import { left, right, move } from './commands/commands'

class RobotNotOnTableError extends Error {
  constructor() {
    super('RobotNotOnTableError')
  }
}

const getErrorMessage = (error?: Error): string => {
  if (error instanceof InvalidInputError) {
    return 'Unrecognised command. Please enter either PLACE, LEFT, RIGHT, MOVE, or REPORT'
  } else if (error instanceof NonIntegerCoordinateError) {
    return 'x and y coordinates should be integers'
  } else if (error instanceof RobotNotOnTableError) {
    return 'PLACE the robot on the table first!'
  } else if (error instanceof OutOfBoundCoordinateError) {
    return 'That would mean the robot would fall off the table!'
  } else {
    return 'Unknown error occurred'
  }
}

function App() {
  class UnknownError extends Error {
    constructor() {
      super('UnknownError')
    }
  }

  const [config, setConfig] = useState<Config>()
  const [error, setError] = useState<Error>()
  const [userInput, setUserInput] = useState('')
  const [isReporting, setIsReporting] = useState(false)

  const processCommand = () => {
    setError(undefined)
    try {
      const command = parseInput(userInput)

      if (command === 'LEFT' || command === 'RIGHT' || command === 'MOVE') {
        if (config === undefined) {
          throw new RobotNotOnTableError()
        }

        let newConfig: Config
        switch (command) {
          case 'LEFT':
            newConfig = left(config)
            break
          case 'RIGHT':
            newConfig = right(config)
            break
          case 'MOVE':
            newConfig = move(config)
            break
        }

        setConfig(newConfig)
      } else if (command === 'REPORT') {
        setIsReporting(true)
      } else {
        // Must be PLACE, so has been parsed into a Config object
        validateConfig(command)
        setConfig(command)
      }
      // Clear input only on success, to allow user to type new command
      setUserInput('')
    } catch (e: unknown) {
      if (
        e instanceof InvalidInputError ||
        e instanceof OutOfBoundCoordinateError ||
        e instanceof RobotNotOnTableError ||
        e instanceof NonIntegerCoordinateError
      ) {
        setError(e)
      } else {
        setError(new UnknownError())
      }
    }
  }

  const configMessage =
    config !== undefined
      ? `Config: x=${config.x.toString()}, y=${config.y.toString()}, f=${config.f}`
      : 'Robot not on table'

  return (
    <>
      <div>
        <img src={robotLogo} className="logo" alt="Robot logo" />
      </div>
      <h1>Toy Robot Simulator</h1>
      <div className="card">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setIsReporting(false)
            processCommand()
          }}
        >
          <input
            type="text"
            onChange={(e) => {
              setUserInput(e.currentTarget.value)
            }}
            value={userInput}
          />
          <input type="submit"></input>
        </form>
        <p className={isReporting ? 'highlight' : ''}>{configMessage}</p>
        {error && <p>{`Error: ${getErrorMessage(error)}`}</p>}
      </div>
    </>
  )
}

export default App
