import {
  degToRad,
  getColStartingRadians
} from './utils.js'

// for putting not so sure functions
// this could be turned pure
// colstarting radians, height, boxWidth, columns number, rows number
function getLinesPositions(boxWidth, columns) {
  const positions = []
  // pure this line will always be consistent with the same input
  const colStartingRadians = getColStartingRadians(columns)
  // full length divided by two
  const xLeftestPos = -(columns * 2 * boxWidth + (columns - 1) * boxWidth) / 2
  let counterCol = 0
  while (counterCol < columns) {
    // baseline for this column starting x
    const columnBaseline = xLeftestPos + counterCol * 3 * boxWidth
    const colCurrentRadians = colStartingRadians[counterCol]
    const positionsForThisColumn = generatePositionsForThisColumn(columnBaseline, colCurrentRadians, boxWidth)
    positions.push(...positionsForThisColumn)
    counterCol++
  }
  return positions
}

function generatePositionsForThisColumn(columnBaseline, colCurrentRadians, boxWidth) {
  const positionsForThisColumn = []
  const height = window.innerHeight
  const rows = 6
  const units = rows * 2
  // box height is so small that it won't be included
  const yGap = Math.floor(height / 12)
  const yTopPos = 2.5 * yGap
  let counter = 0
  while (counter < units) {
    const item = {}
    const offsetToRight = counter % 2 === 0 ? -1 : 1
    const xPos = columnBaseline + (counter % 2) * boxWidth - offsetToRight * boxWidth / 2
    const level = Math.floor(counter / 2)
    const translationsDistances = (boxWidth / 2) * offsetToRight
    const yPos = yTopPos - level * yGap
    item.xPos = xPos
    item.yPos = yPos
    item.radians = colCurrentRadians
    item.translation = translationsDistances
    positionsForThisColumn.push(item)
    counter++
  }
  return positionsForThisColumn
}

export {
  getLinesPositions
}
