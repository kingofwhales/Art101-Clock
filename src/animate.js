import {
  getBoxesCollections,
  getData,
  getPrevTime,
  setPrevTime,
  getCurrentDisplayData,
  setCurrentDisplayData
} from "./store.js";

import {
  degToRad,
  getTimeArray
} from './utils.js'

const initialDuration = 8;
const transitionToDuration = 4
const transitionToDelay = 0.08;
const transitionToSpeed = Math.PI * 2 / transitionToDuration
const boxesCollection = getBoxesCollections()

function iniRotations () {
  startLoopingRotations(boxesCollection)
}
// unit checked R-2
// animations
function startLoopingRotations(boxesCollection) {
  const tl = new TimelineMax();
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
}

// unit checked R-3
function transitionToNumber() {
  const current = new Date();
  const currentTimeArray = getTimeArray(current);
  const pureData = getDestsData(currentTimeArray);
  const transformedData  = transformDataStructureForTransitionTo(pureData)
  const transformedCollections = transformCollectionsStructureForTransitionTo(boxesCollection)
  // console.log('-before transform-')
  // console.log(pureData)
  // console.log('-after transform-')
  // console.log(transformedData)
  const finalData = generateDestinationsData(transformedData)
  console.log('-after final-')
  console.log(finalData)
  animateToGoal(finalData, transformedCollections)
  // animateToTarget(pureData, boxesCollection)

  setPrevTime(current);
  setCurrentDisplayData(pureData);
}
function transformDataStructureForTransitionTo (data) {
  // because of how transitionToNumber transition the elements
  // left, left, right.  left left right. etc
  // We are modifying the structure to make the animate func more readable
  return data.reduce((accu, value, index) => {
    if (index % 2 === 0) {
      accu.push(value, value)
    } else {
      accu.push(value)
    }
    return accu
  }, [])
}

function transformCollectionsStructureForTransitionTo(data) {
  // because of how transitionToNumber transition the elements
  // left, left, right.  left left right. etc
  // We are modifying the structure to make the animate func more readable
  return data.reduce((accu, value, index) => {
    if (index % 2 === 0) {
      accu.push(value)
    } else {
      accu.push(value, value)
    }
    return accu
  }, [])
}

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
}

function generateDestinationsData (data) {
  let rootDelay = 0
  return data.map((element, index, array) => {
    let delay = rootDelay
    const destination = element
    const isSecondHalfBox = index % 3 === 2 ?  true : false
    const firstHalfBoxDestination = array[index - 1];
    let duration, turn90More
    if (element !== firstHalfBoxDestination && isSecondHalfBox === true) {
      turn90More = true
      duration = transitionToDuration / 4
    } else {
      turn90More = false
      duration = transitionToDuration
    }

    if (isSecondHalfBox === true) {
      delay += transitionToDuration
      rootDelay += transitionToDelay
    }

    return {
      destination,
      duration,
      delay,
      turn90More,
      isSecondHalfBox
    }
  })
}
// CAN THIS REALLY BE REFACTORED? 
function animateToTarget(target, boxesCollection) {
  // console.log(target)
  const length = boxesCollection.length - 1; // because of plus two each iteration
  const tl = new TimelineMax();

  let counter = 0;
  let delay = 0
  while (counter < length) {
    tl.to(
      boxesCollection[counter].rotation,
      transitionToDuration,
      {
        directionalRotation: {
          z: -target[counter] + "_ccw",
          useRadians: true
        },
        ease: Power0.easeNone
      },
      delay
    );

    tl.to(
      boxesCollection[counter + 1].rotation,
      transitionToDuration,
      {
        directionalRotation: {
          z: -target[counter] + "_ccw",
          useRadians: true
        },
        ease: Power0.easeNone
      },
      delay
    );

    if (target[counter] !== target[counter + 1]) {
      tl.to(
        boxesCollection[counter + 1].rotation,
        transitionToDuration / 4,
        {
          directionalRotation: {
            z: -target[counter+1] + "_ccw",
            useRadians: true
          },
          ease: Power0.easeNone
        },
        transitionToDuration + delay
      );
    }
    delay += transitionToDelay;
    counter += 2;
  }
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

    if (commonRot === undefined) {
      console.log("--found you---");
      console.log(counter);
    }
    if (redRot === undefined) {
      console.log("--found you you ---");
      console.log(counter);
    }
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





export {
  iniRotations,
  transitionToNumber
}



// function getLatestTimeArray () {
//   // let currentNumber = [1, 2, 1, 2]
//   const current = new Date();
//   const currentTimeArray = getTimeArray(current);
//   return currentTimeArray
// }

// function generateDestinationsData (data) {
//   return data.map((element, index, array) => {
//     const destination = element
//     const isSecondHalfBox = index % 2 === 1 ?  true : false
//     const firstHalfBoxDestination = array[index - 1];
//     let duration, turn90More
//     if (element !== firstHalfBoxDestination && isSecondHalfBox === true) {
//       duration = Math.PI / 2 / transitionToSpeed + transitionToDuration
//       turn90More = true
//     } else {
//       duration = transitionToDuration
//       turn90More = false
//     }

//     return {
//       destination,
//       duration,
//       turn90More,
//       isSecondHalfBox
//     }
//   })
// }

// this won't work for initial because how dynamic the initial state is. impossible to interpolate from here to there in that kind of dynamic states.
// function animateToDestination(data, target) {
//   const tl = new TimelineMax()
//   let delay = 0
//   data.forEach((element, index, array) => {
//     const {destination, duration, turn90More, isSecondHalfBox} = element
//     // let firstStopDestination
//     // if (isSecondHalfBox) {
//     //   firstStopDestination = array[index - 1]
//     // }

//     tl.to(target[index].rotation, duration, {
//       directionalRotation: {
//         z: -destination + "_ccw",
//         useRadians: true
//       },
//       ease: Power0.easeNone
//     }, delay)

//     // if (turn90More) {
//     //   tl.to(target[index].rotation, transitionToDuration/4, {
//     //     directionalRotation: {
//     //       z: -destination + "_ccw",
//     //       useRadians: true
//     //     },
//     //     ease: Power0.easeNone
//     //   }, delay)
//     // }
//     if (isSecondHalfBox) {
//       delay += transitionToDelay
//     }
//   })
// }

// still possible to refactor? READABLE??
// still possible to refactor? READABLE??
// still possible to refactor? READABLE??
// still possible to refactor? READABLE??
// still possible to refactor? READABLE??


// this is a high level function that starts the transition to number process
// first it get current time
// converts it into array
// then it gets data from that latest time array
// then it animate to that target based on the data
// during this process, we also updates the states
// by updating the latest time and current display data in the store
