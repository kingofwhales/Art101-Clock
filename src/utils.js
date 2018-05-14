

// this is pure and predictable with the same arguments
function getColStartingRadians(colNum) {
  //  starting at 90 degrees, each column tilt 20 degrees more
  const item = []
  for (let i = 0; i < colNum; i++) {
    const increment = i * 20 + 90
    const rad = degToRad(increment)
    item.push(rad)
  }
  return item
}
// unit checked R-2
// unit tested T-3
// + much faster than .concat
function getTimeArray(date) {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  hours = hours < 10 ? "0" + String(hours) : String(hours)
  minutes = minutes < 10 ? "0" + String(minutes) : String(minutes)
  return (hours + minutes).split("")
}

// utilities
// this is pure and predictable
function degToRad(deg) {
  return deg * Math.PI / 180
}


function radToDeg(rad) {
  return rad * 180 / Math.PI;
}

function combine(red, black) {
  if (red.length !== black.length) {
    throw "two arrays have different length";
  }
  let newArray = [];
  let counter = 0;
  for (let i of red) {
    newArray.push(i);
    newArray.push(black[counter]);
    counter++;
  }
  return newArray;
}
//  refactor shortest and compare and ...... test fully?!

//  write a test first 
function compareOriDest (ori, dest, loopDuration, useRadians) {
  let counter = 0
  let result = []
  let rotations = useRadians ? 6.28319 : 360
  let speed = rotations / loopDuration
  let delay = loopDuration / 4
  let difference =  useRadians ? 2.1 : 120
  let length = ori.length

  while (counter < length) {
    let item = {}
    item.dest = dest[counter]
    item.ori = ori[counter]
    let tempDiff
    if (ori[counter] > dest[counter]) {
      tempDiff = rotations - Math.abs(dest[counter] - ori[counter]);
    } else {
      tempDiff = Math.abs(dest[counter] - ori[counter]);
    }
    item.diff = tempDiff
    item.duration = tempDiff / speed

    let current, prev, whetherStraight
    if (counter % 2 === 0) {
      item.delay = 0
    } else {
      current = ori[counter] + rotations / 2;
      prev = ori[counter - 1]
      whetherStraight = Math.abs((Math.abs(current - prev) - rotations / 2))
      if (whetherStraight < 0.1) {
        item.delay = 0
      } else {
        item.delay = delay
      }
    }

    result.push(item)
    counter++
  }
  // console.log(result)
  return result
}

//  how the fuck do we rewrite this func?
//  neg: solved by simply adding - before rotation and not messing with the original data
//  compare the original ones without compensating 360?
//  get shortest
//  calc duration
function getShortestDestsClockwise () {

}

// this shit will have to be refactored. impossible to understand . 0 readibility.
function getShortestClockwiseDest(originals, destinations, useRadians) {
  let length = originals.length;
  let offset = useRadians ? 3.14159 : 180;
  // let full = useRadians ? 6.28319 : 360
  let i = 0
  let newDestination = [];
  while (i < length) {
    let leftOriginal = originals[i];
    let rightOriginal = originals[i + 1];
    let leftDestination = destinations[i];
    let rightDestination = destinations[i + 1];

    // alternative routes to go to destinations
    let swapLeftDestination = rightDestination >= offset ? rightDestination - offset : rightDestination + offset;
    let swapRightDestination =
      leftDestination >= offset ? leftDestination - offset : leftDestination + offset;

    // same rule for calculating degrees to go 
    let diffRegularCommon = leftDestination >= leftOriginal ? leftDestination - leftOriginal : 2 * offset - (leftOriginal - leftDestination);
    let diffRegularRed = rightDestination >= rightOriginal ? rightDestination - rightOriginal : 2 * offset - (rightOriginal - rightDestination);
    let diffSwapCommon = swapLeftDestination >= leftOriginal ? swapLeftDestination - leftOriginal : 2 * offset - (leftOriginal - swapLeftDestination);
    let diffSwapRed = swapRightDestination >= rightOriginal ? swapRightDestination - rightOriginal : 2 * offset - (rightOriginal - swapRightDestination);
    let diffRegular = diffRegularCommon + diffRegularRed
    let diffSwap = diffSwapCommon + diffSwapRed

    if (diffSwap < diffRegular) {
      newDestination.push(swapLeftDestination);
      newDestination.push(swapRightDestination);
    } else {
      newDestination.push(leftDestination);
      newDestination.push(rightDestination);
    }
    i += 2;
  }
  return newDestination
}

// work with negative and outside 360

// function arrayPlusOne (array) {

// }

export {
  radToDeg,
  combine,
  getShortestClockwiseDest,
  compareOriDest,
  getColStartingRadians,
  degToRad,
  getTimeArray
  // arrayPlusOne
}
