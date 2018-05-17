import {
  getBoxesCollections,
  getData,
  getPrevTime,
  setPrevTime,
  getCurrentDisplayData,
  setCurrentDisplayData,
  setCurrentTimeline
} from "./store.js";


import {
  degToRad,
  getShortestClockwiseDest,
  getShortestClockwiseNegativeDest,
  // compareOriDest,
  getTimeArray
} from './utils.js'

const initialDuration = 8;
const transitionToDuration = 6
const transitionToDelay = 0.08;
const transitionToSpeed = Math.PI * 2 / transitionToDuration
const boxesCollection = getBoxesCollections()
// const animationTimeline = new TimelineMax()


//  don't care too much about structure now
//  we will refactor units first. then come back to structure.
//  okay?
function prepareAnimation () {
  const tl = startLoopingRotations(boxesCollection)
  setCurrentTimeline(tl)
  // a bit redundant here?
  setTimeout(() => {
    const tl = transitionToNumber()
    setCurrentTimeline(tl)
  },3000)
}

// R-2
function iniRotations () {
  startLoopingRotations(boxesCollection)
}

// R-2
function startLoopingRotations() {
  const tl = new TimelineMax()
  for (const i of boxesCollection) {
    tl.to(
      i.rotation,
      initialDuration,
      {
        // the actual z will always be from 0 -> -6.28
        z: "-=6.28319",
        ease: Power0.easeNone,
        repeat: -1
      },
      0
    );
  }
  return tl
}

// R-3
function transitionToNumber() {
  const current = new Date();
  // const current = new Date("Thu May 17 2018 14:56:12 GMT+0800 (CST)");
  const currentTimeArray = getTimeArray(current);
  const pureData = getDestsData(currentTimeArray);
  const detailedData = generateDestinationsData(pureData, transitionToDuration, transitionToDelay)
  const transformedData = transformDataStructureForTransitionTo(detailedData, true)
  const transformedCollections = transformDataStructureForTransitionTo(boxesCollection, false)

  const tl = animateToGoal(transformedData, transformedCollections)

  setPrevTime(current);
  setCurrentDisplayData(pureData);
  return tl
}

// R - 3
// T - 3
function transformDataStructureForTransitionTo (data, duplicateFirst) {
  // because of how transitionToNumber transition the elements
  // left, left, right.  left left right. etc
  // We are modifying the structure to make the animate func more readable
  return data.reduce((accu, value, index) => {
    const isFirstElement = index % 2 === 0
    if (isFirstElement === duplicateFirst) {
      accu.push(value, value)
    } else {
      accu.push(value)
    }
    return accu
  }, [])
}

// R - 3
function animateToGoal (data, collections) {
  const tl = new TimelineMax()
  data.forEach((element, index) => {
    const duration = element.duration
    const delay = element.delay
    const destination = element.destination
    tl.to(collections[index].rotation, duration,
      {
        directionalRotation: {
          z: - destination + "_ccw",
          useRadians: true
        },
        ease: Power0.easeNone
      }, delay
    )
  })
  return tl
}

function animatePartsTo(data, boxes) {
  // console.log('-data receiving--')
  // console.log(data)
  // console.log('--boxes--')
  // console.log(boxes)
  const tl = new TimelineMax();
  let counter = 0;
  let baseDelay = 0;
  // let length = 96
  while (counter < 191) {
    // animate left
    let commonRot = data[counter];
    let redRot = data[counter + 1];

    // console.log('--what-')
    // console.log(commonRot)
    tl.to(
      boxes[counter].rotation,
      commonRot.duration,
      {
        directionalRotation: {
          z: -commonRot.dest + "_ccw",
          useRadians: true
        },
        ease: Power0.easeNone
      },
      commonRot.delay + baseDelay
    );

    tl.to(
      boxes[counter + 1].rotation,
      redRot.duration,
      {
        directionalRotation: {
          z: -redRot.dest + "_ccw",
          useRadians: true
        },
        ease: Power0.easeNone
      },
      redRot.delay + baseDelay
    );
    counter += 2;
    baseDelay += 0.02;
  }
}

// R - 3
// T - 3
function generateDestinationsData (data, transitionToDuration, transitionToDelayce) {
  let rootDelay = 0
  return data.map((element, index, array) => {
    const isRightHalfBox = index % 2 === 1 ?  true : false
    const leftHalfBoxDestination = array[index - 1];
    const turn90More = element !== leftHalfBoxDestination
    let delay = rootDelay
    let duration = transitionToDuration
    if (isRightHalfBox) {
      delay += transitionToDuration
      rootDelay += transitionToDelay
      duration = 0
    }
    if (turn90More && isRightHalfBox) {
      duration = transitionToDuration / 4
    }
    return {
      duration,
      delay,
      destination: element
    }
  })
}
// CAN THIS REALLY BE REFACTORED? 




// unit cheked R-3
function getDestsData(currentNumber) {
  let data
  data = getData()
  data = extractNumberAllData(currentNumber, data)
  data = flattenData(data)
  data = convertToRad(data)
  data = roundToFourDecimals(data);
  return data
}

// unit cheked R-3
function extractNumberAllData (array, data) {
  return [
    data[array[0]].all,
    data[array[1]].all,
    data[array[2]].all,
    data[array[3]].all
  ]
}

// unit cheked R-3
function roundToFourDecimals(data) {
  return data.map(element => {
    return Math.round(element * 10000) / 10000;
  });
}

// unit cheked R-3
function flattenData(data) {
  return data.reduce((accu, value) => {
    return accu.concat(value)
  }, [])
}

// unit cheked R-3
function convertToRad(data) {
  return data.map(element => {
    return degToRad(element);
  });
}

//WHAT does this do?
// R - 3 
function updateDisplayTime(date) {
  const array = getTimeArray(date);
  const data = getDestsData(array);
  const prevData = getCurrentDisplayData();
  const finalData = compareOriDest(prevData, data, transitionToDuration);
  console.log('-dest-')
  console.log(data)
  console.log('-prev-')
  console.log(prevData)
  const tl = animateToGoal(finalData, boxesCollection)

  setCurrentTimeline(tl)
  setCurrentDisplayData(data);
}

// rewrite compar ori and dest so we can reuse the animateToGoal func
// write a test for this then
// 34 lines ... huh.....
// refactor?
// R-3
// T-3
function compareOriDest(original, destination, loopDuration, rootDelay = 0) {
  const result = []
  const fullCircle = Math.PI * 2
  const speed = fullCircle / loopDuration
  const quarterDelay = loopDuration / 4
  const length = original.length
  destination.forEach((destinationRot, counter) => {
    const originalRot = original[counter];
    const diff = Math.abs(destinationRot - originalRot);
    const travelDistance = originalRot > destinationRot ? fullCircle - diff : diff;
    const isRightHalfBox = counter % 2 === 1 ? true : false;
    const duration = Math.round((travelDistance / speed) *  100) / 100
    let delay = Math.round(rootDelay * 100) / 100;
    let item;
    if (isRightHalfBox && diff != 0) {
      const prevRot = original[counter - 1];
      const whetherStraight = originalRot === prevRot;
      if (!whetherStraight) { //if not straight, delay to align first and then rotate
        delay = delay + quarterDelay;
      }
    }
    result.push({
      delay,
      duration,
      destination: destinationRot,
      original: originalRot
    });
    // console.log('-pushing ')
    // console.log({
    //   delay,
    //   duration,
    //   destination: destinationRot,
    //   original: originalRot
    // });

    if (isRightHalfBox & diff != 0) {
      rootDelay += transitionToDelay;
    }
  })
  // console.log('-final-')
  // console.log(result)
  return result
}



function plusOne() {
  const date = getPlusOneTime()
  setPrevTime(date)
  updateDisplayTime(date)
}

// R-3
function getPlusOneTime() {
  let date = getPrevTime() || new Date()
  date.setMinutes(date.getMinutes() + 1)
  return date
}



export {
  prepareAnimation,
  iniRotations,
  transitionToNumber,
  generateDestinationsData,
  transformDataStructureForTransitionTo,
  plusOne,
  compareOriDest,
  updateDisplayTime
};
