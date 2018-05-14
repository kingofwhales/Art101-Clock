import {
  degToRad,
  getColStartingRadians
} from './utils.js'

// unit checked R-3
// unit tested  T-3
// much better after refactoring. but still pretty bad: 32 lines
function getBoxesPositionsAlt(boxWidth, yGap, rows, columns) {
  const positions = []
  const colStartingRadians = getColStartingRadians(columns)
  const unitsPerColumns = rows * 2
  const totalUnits = columns * unitsPerColumns
  const xLeftestPos = -(columns * 2 * boxWidth + (columns - 1) * boxWidth) / 2 + 1/2 * boxWidth
  const yTopPos = ((rows - 1) / 2) * yGap
  let counter = 0
  while (counter < totalUnits) {
    const columnNumber = Math.floor(counter / unitsPerColumns)
    const unitNumberInCurrentColumn = counter % unitsPerColumns
    const dividend = unitNumberInCurrentColumn % 2
    const rowNumber = Math.floor(unitNumberInCurrentColumn / 2)
    const currentColumnRadians = colStartingRadians[columnNumber]
    const offsetToRight = dividend === 0 ? -1 : 1
    const translationsDistances = boxWidth / 2
    const translationsVector = translationsDistances * offsetToRight
    const xPos = xLeftestPos + dividend * boxWidth + columnNumber * 3 * boxWidth - translationsVector
    const yPos = yTopPos - rowNumber * yGap;
    positions.push({
      xPos,
      yPos,
      translation: translationsVector,
      radians: currentColumnRadians
    })
    counter++
  }
  return positions
}

// // unit checked. R-3
// function getBoxesPositions(boxWidth, yGap, columns) {
//   const positions = []
//   // pure this line will always be consistent with the same input
//   const colStartingRadians = getColStartingRadians(columns)
//   // full length divided by two
//   const xLeftestPos = -(columns * 2 * boxWidth + (columns - 1) * boxWidth) / 2
//   let counterCol = 0
//   while (counterCol < columns) {
//     // baseline for this column starting x
//     const columnBaseline = xLeftestPos + counterCol * 3 * boxWidth
//     const colCurrentRadians = colStartingRadians[counterCol]
//     const positionsForThisColumn = generatePositionsForThisColumn(columnBaseline, colCurrentRadians, boxWidth, yGap)
//     positions.push(...positionsForThisColumn)
//     counterCol++
//   }
//   console.log('-old-')
//   console.log(positions)
//   return positions
// }

// function generatePositionsForThisColumn(columnBaseline, colCurrentRadians, boxWidth, yGap) {
//   const positionsForThisColumn = []
//   const rows = 6
//   const units = rows * 2
//   // box height is so small that it won't be included
//   const yTopPos = 2.5 * yGap
//   let counter = 0
//   while (counter < units) {
//     const item = {}
//     const offsetToRight = counter % 2 === 0 ? -1 : 1
//     const xPos = columnBaseline + (counter % 2) * boxWidth - offsetToRight * boxWidth / 2
//     const level = Math.floor(counter / 2)
//     const translationsDistances = (boxWidth / 2) * offsetToRight
//     const yPos = yTopPos - level * yGap
//     item.xPos = xPos
//     item.yPos = yPos
//     item.radians = colCurrentRadians
//     item.translation = translationsDistances
//     positionsForThisColumn.push(item)
//     counter++
//   }
//   return positionsForThisColumn
// }

export {
  getBoxesPositionsAlt

}
