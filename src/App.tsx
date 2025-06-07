import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { validateConfig, type Config } from './commands/commands'

function App() {
  class UnknownError extends Error {
    constructor() {
      super('UnknownError')
    }
  }
  const [config, setConfig] = useState<Config>()
  const [error, setError] = useState<Error>()

  const place = (config: Config) => {
    try {
      validateConfig(config)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e)
      } else {
        setError(new UnknownError())
      }
    }

    setConfig(config)
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
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
