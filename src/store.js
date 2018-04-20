import {
  combine
} from './utils.js'

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
    dests: combine(commonDestForZero, redlineDestForZero),
    common: commonDestForZero,
    red: redlineDestForZero
  },
  //   1
  {
    number: 1,
    dests: combine(commonDestForOne, redlineDestForOne),
    common: commonDestForOne,
    red: redlineDestForOne
  },
  {
    number: 2,
    dests: combine(commonDestForTwo, redlineDestForTwo),
    common: commonDestForTwo,
    red: redlineDestForTwo
  },
  //   2
  {
    number: 3,
    dests: combine(commonDestForThree, redlineDestForThree),
    common: commonDestForThree,
    red: redlineDestForThree
  },
  {
    number: 4,
    dests: combine(commonDestForFour, redlineDestForFour),
    common: commonDestForFour,
    red: redlineDestForFour
  },
  {
    number: 5,
    dests: combine(commonDestForFive, redlineDestForFive),
    common: commonDestForFive,
    red: redlineDestForFive
  },
  {
    number: 6,
    dests: combine(commonDestForSix, redlineDestForSix),
    common: commonDestForSix,
    red: redlineDestForSix
  },
  {
    number: 7,
    dests: combine(commonDestForSeven, redlineDestForSeven),
    common: commonDestForSeven,
    red: redlineDestForSeven
  },
  {
    number: 8,
    dests: combine(commonDestForEight, redlineDestForEight),
    common: commonDestForEight,
    red: redlineDestForEight
  },
  {
    number: 9,
    dests: combine(commonDestForNine, redlineDestForNine),
    common: commonDestForNine,
    red: redlineDestForNine
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
  getData
}
