import { orientations, type Config } from '../config/config'
import './Table.css'
import robotLogo from '/robot.svg'

const maxCoord = 4

const Table = ({ robotConfig }: { robotConfig: Config | undefined }) => {
  return (
    <div className="table">
      {[...Array(5).keys()].map((y: number) =>
        [...Array(5).keys()].map((x: number) => {
          return <Cell x={x} y={y} />
        })
      )}
      {robotConfig !== undefined && <Robot config={robotConfig} />}
    </div>
  )
}

const Cell = ({ x, y }: { x: number; y: number }) => {
  return (
    <div className="cell" style={{ gridArea: coordsToGridArea(x, y) }}></div>
  )
}

const Robot = ({ config }: { config: Config }) => {
  const rotationDegrees = orientations.indexOf(config.f) * 90
  console.log(rotationDegrees)
  return (
    <div
      className="robot"
      style={{ gridArea: coordsToGridArea(config.x, config.y) }}
    >
      <img
        src={robotLogo}
        style={{ transform: `rotate(${rotationDegrees.toString()}deg)` }}
      />
    </div>
  )
}

const coordsToGridArea = (x: number, y: number) => {
  const rowStart = maxCoord - y + 1
  const columnStart = x + 1
  const rowEnd = rowStart + 1
  const columnEnd = columnStart + 1
  const str = `${rowStart.toString()} / ${columnStart.toString()} / ${rowEnd.toString()} / ${columnEnd.toString()}`
  console.log(str)
  return str
}

export default Table
