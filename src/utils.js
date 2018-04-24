function degToRad(deg) {
  return deg * Math.PI / 180;
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

//  write a test first 
function compareOriDest (ori, dest, loopDuration, useRadians) {
  let counter = 0
  let result = []
  let rotations = useRadians ? 6.28319 : 360
  let speed = rotations / loopDuration
  let delay = loopDuration / 4
  let difference =  useRadians ? 1.8 : 120

  for (let i of ori) {
    let item = {}
    if (i !== dest[counter]) {
      item.dest = dest[counter]
      item.ori = i
      item.diff = Math.abs(dest[counter] - i)
      item.duration = Math.abs(dest[counter] - i) / speed
      if (counter % 2 != 0) {
        let prev = ori[counter - 1]
        let current = i
        if (Math.abs(current - prev) >= difference) {
          item.delay = delay
        } else {
          item.delay = 0
        }

      } else {
        item.delay = 0 
      }
    } else {
      item.delay = 0
      item.duration = 0
      item.diff = 0
    }
    result.push(item)
    counter++
  }
  console.log(result)
  return result
}


// this shit will have to be refactored. impossible to understand . 0 readibility.
function getShortestClockwiseDest(ori, dest, useRadians) {
  let length = ori.length;
  let offset = useRadians ? 3.14159 : 180;
  // let full = useRadians ? 6.28319 : 360
  let i = 0
  let newDest = [];
  while (i < length) {
    let commonOri = ori[i];
    let redOri = ori[i + 1];
    let commonDest = dest[i];
    let redDest = dest[i + 1];
    let swapCommonDest = redDest >= offset ? redDest - offset : redDest + offset;
    let swapRedDest =
      commonDest >= offset ? commonDest - offset : commonDest + offset;

    // same rule for calculating degrees to go 
    let diffRegularCommon = commonDest >= commonOri ? commonDest - commonOri : 2 * offset - (commonOri - commonDest);
    let diffRegularRed = redDest >= redOri ? redDest - redOri : 2 * offset - (redOri - redDest);
    let diffSwapCommon = swapCommonDest >= commonOri ? swapCommonDest - commonOri : 2 * offset - (commonOri - swapCommonDest);
    let diffSwapRed = swapRedDest >= redOri ? swapRedDest - redOri : 2 * offset - (redOri - swapRedDest);

    let diffRegular = diffRegularCommon + diffRegularRed
    let diffSwap = diffSwapCommon + diffSwapRed

    if (diffSwap <= diffRegular) {
      newDest.push(swapCommonDest);
      newDest.push(swapRedDest);
    } else {
      newDest.push(commonDest);
      newDest.push(redDest);
    }
    i += 2;
  }
  return newDest
}
// function arrayPlusOne (array) {

// }

export {
  degToRad,
  radToDeg,
  combine,
  getShortestClockwiseDest
  // compareOriDest
  // arrayPlusOne
}
