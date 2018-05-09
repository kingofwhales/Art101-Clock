import {
  getCubesCollections,
  getData,
  getPrevTime,
  setPrevTime,
  getCurrentDisplayData,
  setCurrentDisplayData
} from "./store.js";

import {
  degToRad
} from './utils.js'

const initialDuration = 8;
const transitionToDuration = 6
const transitionToDelay = 0.08;
const transitionToSpeed = Math.PI * 2 / transitionToDuration
const cubesCollection = getCubesCollections()

// animations
function iniRotations() {
  let tl = new TimelineMax();
  for (let i of cubesCollection) {
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

// this is a high level function that starts the transition to number process
// first it get current time
// converts it into array
// then it gets data from that latest time array
// then it animate to that target based on the data
// during this process, we also updates the states
// by updating the latest time and current display data in the store

function transitionToNumber() {

  const current = new Date();
  const currentTimeArray = getTimeArray(current);
  const pureData = getDestsData(currentTimeArray, true, 0);
  const destinationData = generateDestinationsData(pureData)
  // console.log(destinationData)
  // animateToDestination(destinationData, cubesCollection);
  animateToTarget(pureData)
  setPrevTime(current);
  setCurrentDisplayData(pureData);
}

// function getLatestTimeArray () {
//   // let currentNumber = [1, 2, 1, 2]
//   const current = new Date();
//   const currentTimeArray = getTimeArray(current);
//   return currentTimeArray
// }

function generateDestinationsData (data) {
  return data.map((element, index, array) => {
    const destination = element
    const isSecondHalfBox = index % 2 === 1 ?  true : false
    const firstHalfBoxDestination = array[index - 1];
    let duration, turn90More
    if (element !== firstHalfBoxDestination && isSecondHalfBox === true) {
      duration = Math.PI / 2 / transitionToSpeed + transitionToDuration
      turn90More = true
    } else {
      duration = transitionToDuration
      turn90More = false
    }

    return {
      destination,
      duration,
      turn90More,
      isSecondHalfBox
    }
  })
}

// this won't work for initial because how dynamic the initial state is. impossible to interpolate from here to there in that kind of dynamic states.
function animateToDestination(data, target) {
  const tl = new TimelineMax()
  let delay = 0
  data.forEach((element, index, array) => {
    const {destination, duration, turn90More, isSecondHalfBox} = element
    // let firstStopDestination
    // if (isSecondHalfBox) {
    //   firstStopDestination = array[index - 1]
    // }

    tl.to(target[index].rotation, duration, {
      directionalRotation: {
        z: -destination + "_ccw",
        useRadians: true
      },
      ease: Power0.easeNone
    }, delay)

    // if (turn90More) {
    //   tl.to(target[index].rotation, transitionToDuration/4, {
    //     directionalRotation: {
    //       z: -destination + "_ccw",
    //       useRadians: true
    //     },
    //     ease: Power0.easeNone
    //   }, delay)
    // }
    if (isSecondHalfBox) {
      delay += transitionToDelay
    }
  })
}


function animateToTarget(target) {
  console.log(target)
  const length = cubesCollection.length - 1; // because of plus two each iteration
  const tl = new TimelineMax();

  let counter = 0;
  let delay = 0
  while (counter < length) {
    tl.to(
      cubesCollection[counter].rotation,
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
      cubesCollection[counter + 1].rotation,
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
      // console.log('-yeah-')
      // console.log(-target[counter+1] + "_ccw");
      tl.to(
        cubesCollection[counter + 1].rotation,
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

function getDestsData(currentNumber, useRadians, compensateDegrees) {
  let data = getData(currentNumber);
  // console.log("--before flat--")
  // console.log(data)
  // flatten four into one
  data = flattenData(data);
  let radData = {};
  let compData = {};
  let roundedData = {};
  let counterCWData = [];

  //  if compenstated by degrees
  if (compensateDegrees) {
    for (let i in data) {
      compData[i] = compensateDegreesBy(data[i], compensateDegrees);
    }
    data = compData;
  }

  //  if return one converted to radians
  if (useRadians) {
    for (let i in data) {
      radData[i] = convertToRad(data[i]);
    }
    data = radData;
  }

  for (let i in data) {
    roundedData[i] = roundToFourDecimals(data[i]);
  }
  data = roundedData;

  counterCWData = data.all.map(element => {
    return element;
  });

  // console.log("--after rounded--")
  // console.log(data)

  return counterCWData;
}

function roundToFourDecimals(data) {
  return data.map(element => {
    return Math.round(element * 10000) / 10000;
  });
}

function flattenData(data) {
  let newArray = {
    right: [],
    left: [],
    all: []
  };
  for (let i of data) {
    newArray.right = newArray.right.concat(i.right);
    newArray.left = newArray.left.concat(i.left);
    newArray.all = newArray.all.concat(i.all);
  }
  return newArray;
}

function compensateDegreesBy(data, deg) {
  return data.map(element => {
    return element + deg;
  });
}

function convertToRad(data) {
  return data.map(element => {
    return degToRad(element);
  });
}

function getTimeArray(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours < 10 ? "0" + hours : String(hours);
  minutes = minutes < 10 ? "0" + minutes : String(minutes);
  return (hours + minutes).split("");
}




export {
  iniRotations,
  transitionToNumber
}
