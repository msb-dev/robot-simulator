import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  validateConfig,
  type Config,
  NonIntegerCoordinateError,
  OutOfBoundCoordinateError,
} from './config/config'
import { InvalidInputError, parseInput } from './parseInput'
import { left } from './commands/commands'

const getErrorMessage = (error?: Error): string | undefined => {
  if (error instanceof NonIntegerCoordinateError) {
    return 'x and y coordinates should be integers'
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

  class RobotNotOnTableError extends Error {
    constructor() {
      super('RobotNotOnTableError')
    }
  }
  const [config, setConfig] = useState<Config>()
  const [error, setError] = useState<Error>()
  const [userInput, setUserInput] = useState('')

  const place = (config: Config) => {
    try {
      validateConfig(config)
      setConfig(config)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e)
      } else {
        setError(new UnknownError())
      }
    }
  }

  const processCommand = () => {
    try {
      setError(undefined)
      const command = parseInput(userInput)
      if (command === 'LEFT') {
        if (config === undefined) {
          setError(new RobotNotOnTableError())
          return
        }
        const newConfig = left(config)
        setConfig(newConfig)
        setUserInput('')
      } else if (
        command === 'MOVE' ||
        command === 'REPORT' ||
        command === 'RIGHT'
      ) {
        setUserInput('')
      } else {
        // Must be PLACE, so has been parsed into a Config object
        try {
          validateConfig(command)
          setConfig(command)
          setUserInput('')
        } catch (e: unknown) {
          if (e instanceof Error) {
            setError(e)
          } else {
            setError(new UnknownError())
          }
        }
      }
    } catch (e: unknown) {
      if (e instanceof InvalidInputError) {
        setError(e)
      } else {
        setError(new UnknownError())
      }
    }
  }

  const configMessage =
    config !== undefined
      ? `Config: x=${config.x}, y=${config.y}, f=${config.f}`
      : 'Robot not on table'

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Toy Robot Simulator</h1>
      <div className="card">
        <button
          onClick={() => {
            place({ x: 1, y: 2, f: 'NORTH' })
          }}
        >
          Place 1, 2, NORTH
        </button>

        <p>{configMessage}</p>
        {error && <p>{`Error: ${getErrorMessage(error)}`}</p>}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          processCommand()
        }}
      >
        <input
          type="text"
          onChange={(e) => setUserInput(e.currentTarget.value)}
          value={userInput}
        />
        <input type="submit"></input>
      </form>
    </>
  )
}

export default App
