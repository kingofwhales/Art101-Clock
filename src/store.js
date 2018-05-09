import {
  combine
} from './utils.js'

let time, currentDisplayData

const cubesCollection = []

function getCubesCollections () {
  return cubesCollection
}

function updateCubesCollection (dataArray) {
  return cubesCollection.push(...dataArray)
}

function getCurrentDisplayData () {
  return currentDisplayData
}
function setCurrentDisplayData (data) {
  currentDisplayData = data
  return currentDisplayData
}

function getPrevTime () {
  return time
}

function setPrevTime (date) {
  time = date
  return time
}

let commonDestForZero = [
  270,
  270,
  270,
  270,
  270,
  180,

  360,
  270,
  270,
  270,
  180,
  360,

  360,
  360,
  270,
  270,
  90,
  360,

  360,
  270,
  270,
  270,
  270,
  90
];
let commonDestForOne = [
  270,
  180,
  135,
  135,
  270,
  180,

  360,
  360,
  270,
  270,
  90,
  360,

  360,
  270,
  270,
  270,
  180,
  360,

  135,
  135,
  135,
  135,
  360,
  90
];
let commonDestForTwo = [
  270,
  180,
  270,
  270,
  270,
  180,

  360,
  360,
  360,
  270,
  180,
  360,

  360,
  360,
  90,
  360,
  360,
  360,

  360,
  270,
  270,
  90,
  360,
  90
];
let commonDestForThree = [
  270,
  180,
  270,
  180,
  270,
  180,

  360,
  360,
  360,
  360,
  360,
  360,

  360,
  360,
  90,
  360,
  90,
  360,

  360,
  270,
  270,
  270,
  270,
  90
];
let commonDestForFour = [
  270,
  270,
  270,
  180,
  135,
  135,

  360,
  270,
  180,
  360,
  135,
  135,

  270,
  270,
  90,
  360,
  270,
  180,

  360,
  270,
  270,
  270,
  270,
  90
];
let commonDestForFive = [
  270,
  270,
  270,
  180,
  270,
  180,

  360,
  270,
  180,
  360,
  360,
  360,

  360,
  360,
  360,
  360,
  90,
  360,

  360,
  90,
  360,
  270,
  270,
  90
];
let commonDestForSix = [
  270,
  270,
  270,
  270,
  270,
  180,

  360,
  270,
  180,
  270,
  180,
  360,

  360,
  360,
  360,
  360,
  90,
  360,

  360,
  90,
  360,
  270,
  270,
  90
];
let commonDestForSeven = [
  270,
  180,
  135,
  135,
  135,
  135,

  360,
  360,
  135,
  135,
  135,
  135,

  360,
  360,
  270,
  270,
  270,
  180,

  360,
  270,
  270,
  270,
  270,
  90
];
let commonDestForEight = [
  270,
  270,
  270,
  270,
  270,
  180,

  360,
  270,
  180,
  270,
  180,
  360,

  360,
  360,
  90,
  360,
  90,
  360,

  360,
  270,
  270,
  270,
  270,
  90
];
let commonDestForNine = [
  270,
  270,
  270,
  180,
  135,
  135,

  360,
  270,
  180,
  360,
  135,
  135,

  360,
  360,
  90,
  360,
  270,
  180,

  360,
  270,
  270,
  270,
  270,
  90
];

let redlineDestForZero = [
  360,
  270,
  270,
  270,
  270,
  270,

  360,
  360,
  270,
  270,
  270,
  360,

  360,
  90,
  270,
  270,
  180,
  360,

  90,
  270,
  270,
  270,
  270,
  180
];
let redlineDestForOne = [
  360,
  270,
  135,
  135,
  360,
  270,

  360,
  90,
  270,
  270,
  180,
  360,

  90,
  270,
  270,
  270,
  270,
  360,

  135,
  135,
  135,
  135,
  90,
  180
];
let redlineDestForTwo = [
  360,
  270,
  360,
  270,
  270,
  270,

  360,
  360,
  360,
  360,
  270,
  360,

  360,
  90,
  180,
  360,
  360,
  360,

  90,
  270,
  270,
  180,
  90,
  180
];
let redlineDestForThree = [
  360,
  270,
  360,
  270,
  360,
  270,

  360,
  360,
  360,
  360,
  360,
  360,

  360,
  90,
  180,
  90,
  180,
  360,

  90,
  270,
  270,
  270,
  270,
  180
];
let redlineDestForFour = [
  360,
  270,
  270,
  270,
  135,
  135,

  90,
  270,
  270,
  360,
  135,
  135,

  360,
  270,
  180,
  90,
  270,
  270,

  90,
  270,
  270,
  270,
  270,
  180
];
let redlineDestForFive = [
  360,
  270,
  270,
  270,
  360,
  270,

  360,
  360,
  270,
  360,
  360,
  360,

  360,
  360,
  360,
  90,
  180,
  360,

  90,
  180,
  90,
  270,
  270,
  180
];
let redlineDestForSix = [
  360,
  270,
  270,
  270,
  270,
  270,

  360,
  360,
  270,
  360,
  270,
  360,

  360,
  360,
  360,
  90,
  180,
  360,

  90,
  180,
  90,
  270,
  270,
  180
];
let redlineDestForSeven = [
  360,
  270,
  135,
  135,
  135,
  135,

  360,
  360,
  135,
  135,
  135,
  135,

  360,
  90,
  270,
  270,
  270,
  270,

  90,
  270,
  270,
  270,
  270,
  180
];
let redlineDestForEight = [
  360,
  270,
  270,
  270,
  270,
  270,

  360,
  360,
  270,
  360,
  270,
  360,

  360,
  90,
  180,
  90,
  180,
  360,

  90,
  270,
  270,
  270,
  270,
  180
];
let redlineDestForNine = [
  360,
  270,
  270,
  270,
  135,
  135,

  360,
  360,
  270,
  360,
  135,
  135,

  360,
  90,
  180,
  90,
  270,
  270,

  90,
  270,
  270,
  270,
  270,
  180
];

let data = [
  // 0
  {
    number: 0,
    all: combine(commonDestForZero, redlineDestForZero),
    left: commonDestForZero,
    right: redlineDestForZero
  },
  //   1
  {
    number: 1,
    all: combine(commonDestForOne, redlineDestForOne),
    left: commonDestForOne,
    right: redlineDestForOne
  },
  {
    number: 2,
    all: combine(commonDestForTwo, redlineDestForTwo),
    left: commonDestForTwo,
    right: redlineDestForTwo
  },
  //   2
  {
    number: 3,
    all: combine(commonDestForThree, redlineDestForThree),
    left: commonDestForThree,
    right: redlineDestForThree
  },
  {
    number: 4,
    all: combine(commonDestForFour, redlineDestForFour),
    left: commonDestForFour,
    right: redlineDestForFour
  },
  {
    number: 5,
    all: combine(commonDestForFive, redlineDestForFive),
    left: commonDestForFive,
    right: redlineDestForFive
  },
  {
    number: 6,
    all: combine(commonDestForSix, redlineDestForSix),
    left: commonDestForSix,
    right: redlineDestForSix
  },
  {
    number: 7,
    all: combine(commonDestForSeven, redlineDestForSeven),
    left: commonDestForSeven,
    right: redlineDestForSeven
  },
  {
    number: 8,
    all: combine(commonDestForEight, redlineDestForEight),
    left: commonDestForEight,
    right: redlineDestForEight
  },
  {
    number: 9,
    all: combine(commonDestForNine, redlineDestForNine),
    left: commonDestForNine,
    right: redlineDestForNine
  }
];


function getData (currentNumber) {
  return [
    data[currentNumber[0]],
    data[currentNumber[1]],
    data[currentNumber[2]],
    data[currentNumber[3]]
  ]
}

export {
  getData,
  getPrevTime,
  setPrevTime,
  getCurrentDisplayData,
  setCurrentDisplayData,
  updateCubesCollection,
  getCubesCollections
}
