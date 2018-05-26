import {TimelineMax} from 'gsap'

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
  startLoopingRotations,
  animateToGoal
} from './animate.js'


import {
  getTimeArray,
  getColStartingRadians,
  roundUnitToFourDecimals,
  roundToFourDecimals,
  convertToRad,
  flattenData,
  roundUnitToTwoDecimals,
  getActualDistance
} from './utils.js'

const initialDuration = 2;
const initialRotation = roundUnitToFourDecimals(Math.PI * 2)
const initialSpeed = initialRotation / initialDuration
const transitionToDuration = 1
const transitionToDelay = 0.08;
const transitionToSpeed = Math.PI * 2 / transitionToDuration //necessary?
const boxesCollection = getBoxesCollections()
const whenToTransition = 3
const columnDelay = 0.4
// const animationTimeline = new TimelineMax()


// R-3
function prepareAnimation () {
  const [data, collections] = prepareData()

  const masterTL = new TimelineMax()
  setCurrentTimeline(masterTL)

  masterTL.add(startLoopingRotations(boxesCollection,initialDuration), 0)
  masterTL.add(animateToGoal(data, collections), whenToTransition)
}

//WHAT does this do?
// R - 3 
function updateDisplayTime(date) {
  const array = getTimeArray(date);
  const data = getDestsData(array);
  const prevData = getCurrentDisplayData();
  const finalData = compareOriDest(prevData, data, transitionToDuration);
  // console.log('-dest-')
  // console.log(data)
  // console.log('-final-')
  // console.log(finalData)
  const tl = animateToGoal(finalData, boxesCollection)

  setCurrentTimeline(tl)
  setPrevTime(date)
  setCurrentDisplayData(data);
}


// kind sure
// kinda sure


///// not so sure part
///// not so sure part
///// not so sure part
///// not so sure part
///// not so sure part
///// not so sure part

// R - 3 
function prepareData() {
  const pureData = getDataWithTime()
  const initialStarting = getEstimatedStartingPos()
  const detailedData = generateDestinationsDataInitial(initialStarting, pureData, transitionToDuration)
  const transformedData = transformDataStructureForTransitionTo(detailedData, true)
  const transformedCollections = transformDataStructureForTransitionTo(boxesCollection, false)
  return [transformedData, transformedCollections]
}

function getEstimatedStartingPos() {
  const initialStarting = generateInitialStartingPos()
  return initialStarting.reduce((accu, element) => {
    return accu.concat(Array(12).fill(element))
  }, [])
}

function getDataWithTime() {
  // let current = new Date();
  let current = new Date("Thu May 17 2018 08:47:59 GMT+0800 (CST)");
  current.setSeconds(current.getSeconds() + whenToTransition)
  const currentTimeArray = getTimeArray(current);
  const pureData = getDestsData(currentTimeArray);
  setPrevTime(current)
  setCurrentDisplayData(pureData)

  return pureData
}

function generateDestinationsDataInitial(
  original,
  destination,
  loopDuration,
  rootDelay = 0
) {
  const result = [];
  const fullCircle = Math.PI * 2;
  const speed = fullCircle / loopDuration;
  destination.forEach((destinationRot, counter, array) => {
    if (counter % 12 === 0 && counter != 0) {
      rootDelay += columnDelay;
    }
    const originalRot = original[counter];
    const travelDistance = getActualDistance(originalRot, destinationRot);
    const prevDestinationRot = array[counter - 1];
    const isRightHalfBox = counter % 2 === 1 ? true : false;
    const destIsSame = destinationRot === prevDestinationRot;
    let duration = roundUnitToTwoDecimals(travelDistance / speed);
    let delay = roundUnitToTwoDecimals(rootDelay);
    if (!destIsSame && isRightHalfBox) {
      delay += result[counter - 1].duration;
      duration = fullCircle / 4 / speed;
    }
    result.push({
      delay,
      duration,
      travelDistance,
      destination: destinationRot,
      original: originalRot
    });
  });
  return result;
}
// can these two functions be reduced to one?
// it could be combined
// and the crucial part is deciding
//  whether destinations straight
//  whether initials are straight

function compareOriDest(original, destination, loopDuration, rootDelay = 0) {
  const result = [];
  const fullCircle = Math.PI * 2;
  const speed = fullCircle / loopDuration;
  const quarterDelay = loopDuration / 4;
  const length = original.length;
  destination.forEach((destinationRot, counter) => {
    const originalRot = original[counter];
    const diff = Math.abs(destinationRot - originalRot);
    const travelDistance = getActualDistance(originalRot, destinationRot);
    const isRightHalfBox = counter % 2 === 1 ? true : false;
    const duration = Math.round(travelDistance / speed * 100) / 100;
    let delay = Math.round(rootDelay * 100) / 100;
    let item;
    if (isRightHalfBox && diff != 0) {
      const prevRot = original[counter - 1];
      const whetherStraight = originalRot === prevRot;
      if (!whetherStraight) {
        //if not straight, delay to align first and then rotate
        delay = delay + quarterDelay;
      }
    }
    result.push({
      delay,
      duration,
      destination: destinationRot,
      original: originalRot
    });

    if (isRightHalfBox & (diff != 0)) {
      rootDelay += transitionToDelay;
    }
  });
  return result;
}

// R - 3
// T - 3
function transformDataStructureForTransitionTo(data, duplicateFirst) {
  // because of how transitionToNumber transition the elements
  // left, left, right.  left left right. etc
  // We are modifying the structure to make the animate func more readable
  return data.reduce((accu, value, index) => {
    const isFirstElement = index % 2 === 0;
    if (isFirstElement === duplicateFirst) {
      accu.push(value, value);
    } else {
      accu.push(value);
    }
    return accu;
  }, []);
}

function generateInitialStartingPos() {
  const colStartingRadians = getColStartingRadians(16);
  // console.log(colStartingRadians)
  return colStartingRadians.map((element, index) => {
    const traveledDistance =
      (whenToTransition + index * columnDelay) * initialSpeed;
    const remaining = traveledDistance % initialRotation;
    const result = element - remaining;
    return result;
  });
}


// unit cheked R-3
function getDestsData(currentNumber) {
  let data;
  data = getData();
  data = extractNumberAllData(currentNumber, data);
  data = flattenData(data);
  data = convertToRad(data);
  data = roundToFourDecimals(data);
  return data;
}

// unit cheked R-3
function extractNumberAllData(array, data) {
  return [
    data[array[0]].all,
    data[array[1]].all,
    data[array[2]].all,
    data[array[3]].all
  ];
}



// rewrite compar ori and dest so we can reuse the animateToGoal func
// write a test for this then
// 34 lines ... huh.....
// refactor?
// R-3
// T-3






export {
  prepareAnimation,
  updateDisplayTime,
};





// function prepareForTransitionTo() {
//   // console.log('-starting-')
//   const haha = new TimelineMax()
//   // startLoopingRotationsTest()
//   // const startingCols = getColStartingRadians(16)
//   // const startingData = startingCols.reduce((accu, value, index) => {
//   //   const endingValue = roundUnitToFourDecimals(value)
//   //   const item = Array(12).fill(endingValue)
//   //   return accu.concat(item)
//   // }, [])
//   // const startingData = Array(192).fill(0)
//   // const date = new Date()
//   const date = new Date("Fri May 18 2018 13:06:46 GMT+0800 (CST)");
//   const timeArray = getTimeArray(date)
//   const pureData = getDestsData(timeArray)
//   const detailedDest = generateDestinationsDataInitial(pureData, transitionToDuration);
//   const boxesCollection = getBoxesCollections()

//   const transformedData = transformDataStructureForTransitionTo(detailedDest, true)
//   const transformedCollections = transformDataStructureForTransitionTo(boxesCollection, false)
//   // console.log('transformed data')
//   // console.log(transformedData)
//   // setTimeout(() => {
//   //   animateToGoal(transformedData, transformedCollections)
//   // }, 4000)
//   haha.add(startLoopingRotationsTest(), 0)
//   haha.add(animateToGoal(transformedData, transformedCollections), initial)

//   // console.log(detailedDest)
//   // console.log('-pure-')
//   // console.log(pureData)

//   // console.log(startingData)
// }

// // it's different
// // we want the second one to conform to the first one
// // later transitions from number to number
// // they are all within 360
// //  so no problems of these extra loops
// // but the intial ones
// // because of the rotations looping for a while
// //  they will be over 360 and thus create this additional problems
// // let's see from a higher level if this is possible first before we move on
// function startLoopingRotationsTest() {
//   const tl = new TimelineMax();
//   // const startingCols = getColStartingRadians(16)
//   // const startingData = startingCols.reduce((accu, value, index) => {
//   //   const endingValue = roundUnitToFourDecimals(value)
//   //   const item = Array(12).fill(endingValue)
//   //   return accu.concat(item)
//   // }, [])
//   // let counter = 0
//   let delay = 0
//   let counter = 0
//   let goal = - Math.PI * 2
//   let delayArray = []
//   for (const i of boxesCollection) {
//     if (counter % 12 === 0 && counter != 0) {
//       delay = Math.round((delay + 0.2) * 100) / 100
//     }
//     tl.to(
//       i.rotation,
//       initialDuration,
//       {
//         // the actual z will always be from 0 -> -6.28
//         directionalRotation: {
//           z: goal + "_ccw",
//           useRadians: true
//         },
//         ease: Power0.easeNone,
//         repeat: -1
//       },
//       delay

//     );
//     counter++
//     delayArray.push(delay)
//   }
//   // console.log(delayArray)
//   return tl;

// }



// // R-2
// function iniRotations() {
//   startLoopingRotations(boxesCollection)
// }


// // R-3
// function transitionToNumber() {
//   // const current = new Date();
//   const current = new Date("Thu May 17 2018 14:47:12 GMT+0800 (CST)");
//   const currentTimeArray = getTimeArray(current);
//   const pureData = getDestsData(currentTimeArray);
//   const initialStarting = generateInitialStartingPos()
//   const fullInitialStarting = initialStarting.reduce((accu, element) => {
//     return accu.concat(Array(12).fill(element))
//   }, [])

//   const detailedData = generateDestinationsDataInitial(fullInitialStarting, pureData, transitionToDuration)
//   const transformedData = transformDataStructureForTransitionTo(detailedData, true)
//   const transformedCollections = transformDataStructureForTransitionTo(boxesCollection, false)
//   // console.log('-very detailed-')
//   // console.log(detailedData)
//   // console.log(transformedData)

//   // console.log(fullInitialStarting)
//   // console.log('detailed dat')
//   // console.log(detailedData)
//   // console.log(transformedData)
//   const tl = animateToGoal(transformedData, transformedCollections)

//   setPrevTime(current);
//   setCurrentDisplayData(pureData);
//   return tl
// }

// function animatePartsTo(data, boxes) {
//   // console.log('-data receiving--')
//   // console.log(data)
//   // console.log('--boxes--')
//   // console.log(boxes)
//   const tl = new TimelineMax();
//   let counter = 0;
//   let baseDelay = 0;
//   // let length = 96
//   while (counter < 191) {
//     // animate left
//     let commonRot = data[counter];
//     let redRot = data[counter + 1];

//     // console.log('--what-')
//     // console.log(commonRot)
//     tl.to(
//       boxes[counter].rotation,
//       commonRot.duration,
//       {
//         directionalRotation: {
//           z: -commonRot.dest + "_ccw",
//           useRadians: true
//         },
//         ease: Power0.easeNone
//       },
//       commonRot.delay + baseDelay
//     );

//     tl.to(
//       boxes[counter + 1].rotation,
//       redRot.duration,
//       {
//         directionalRotation: {
//           z: -redRot.dest + "_ccw",
//           useRadians: true
//         },
//         ease: Power0.easeNone
//       },
//       redRot.delay + baseDelay
//     );
//     counter += 2;
//     baseDelay += 0.02;
//   }
// }


// // to ensure that all columns initial are not too different > Math.PI * 2
// // too much time delay
// // let columnDelay = 2;
// // let finalColumn = initialSpeed * (columnDelay * 15 + whenToTransition)

// // while (finalColumn >= initialRotation && columnDelay > 0.4) {
// //   columnDelay -= 0.2
// //   finalColumn = initialSpeed * (columnDelay * 15 + whenToTransition);
// // }
// // console.log('-final column delay-')
// // console.log(columnDelay)
// // delay should be smaller than
// // until the end column
// // no more than 360
// // whether it stays within the same circle depends on three factors
// // speed & columnDelay & whenToTransition


// // as long as the initial are good
// // when two columns don't differ too much suddenly
// // then the final effect will be smooth



// // R - 3
// // T - 3
// function generateDestinationsData(data, transitionToDuration, transitionToDelayce) {
//   let rootDelay = 0
//   return data.map((element, index, array) => {
//     const isRightHalfBox = index % 2 === 1 ? true : false
//     const leftHalfBoxDestination = array[index - 1];
//     const turn90More = element !== leftHalfBoxDestination
//     let delay = rootDelay
//     let duration = transitionToDuration
//     if (index % 12 === 0 && index != 0) {
//       rootDelay += columnDelay
//     }
//     if (isRightHalfBox) {
//       delay += transitionToDuration
//       // rootDelay += transitionToDelay
//       duration = 0
//     }
//     if (turn90More && isRightHalfBox) {
//       duration = transitionToDuration / 4
//     }
//     return {
//       duration,
//       delay,
//       destination: element
//     }
//   })
// }
// // CAN THIS REALLY BE REFACTORED? 
