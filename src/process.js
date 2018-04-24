import * as PIXI from "pixi.js";

import {
  getData,
  getPrevTime,
  setPrevTime,
  setCurrentDisplayData,
  getCurrentDisplayData
} from './store.js'

import {
  radToDeg,
  degToRad,
  // compareOriDest
  // arrayPlusOne
} from './utils.js'

import {
  regularRotation,
  animateTo,
  animatePartsTo
} from './animate.js'

// setting const variables
const APPLICATION = PIXI.Application
const GRAPHICS = PIXI.Graphics
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight
const RESOLUTION = window.devicePixelRatio;
const CONTAINER = PIXI.Container

//  main pixi app
let app

//  array for graphics item
let boxes = []

// x & y positions, distances, width, height when drawing lines
// responsive length for boxes. gap is 1/4 of one full line. left and right margin is one full line.
let xPos, yPos, xDis, yDis, lineWidth, lineHeight
lineWidth = WIDTH / 87 * 2;
xDis = lineWidth / 2;
yDis = HEIGHT / 10;
lineHeight = 4;

// starting degrees for each columns
let colRotation = getColStartingDegrees()

// set up draw board, draw all the lines first, and then initate regular rotations
function setup () {
  let app = new APPLICATION({
    width: WIDTH,
    height: HEIGHT,
    antialias: true,
    transparent: true,
    resolution: RESOLUTION
  })

  // make it responsive
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
  document.body.appendChild(app.view);

  // a parent container for all the lines
  let boxContainer = new CONTAINER();
  boxContainer.x = 60;
  boxContainer.y = 100;
  app.stage.addChild(boxContainer);

  // left or right line and offset based on that
  let divident, offset
  // which row
  let level
  // for color
  // let fillColor = 0xff9933
  let borderColor = 0xff9933;
  // for pivot point
  let centerX, centerY
  //  counters for iterating through
  let counterRow = 0
  let counterCol = 0

  // each column has 12 lines, 6 rows, 2 lines on each row, left and right
  // the whole block has 16 columns, repeat
  // condition 1: whether left or right based on divident
  // condition 2: which row based on divided by 2
  // draw each column first because of the animation order
  // each column has a baseline x pos. increment line width to get respective coordinates

  while (counterCol < 16) {
    counterRow = 0
    // baseline xpos for each columns
    let xBaseline = counterCol * (lineWidth * 2 + xDis) 

    while (counterRow < 12) {
      divident = counterRow % 2
      level = Math.floor(counterRow / 2)
      // offset = divident === 0 ? 1 : -1
      xPos = xBaseline + divident * lineWidth
      yPos = level * yDis
      let fillColor = divident === 0 ? 0x000000 : 0xed33332
      centerX = xBaseline + lineWidth
      centerY = yPos + lineHeight / 2;
      let roundBox = new GRAPHICS();
      roundBox.lineStyle(2, borderColor, 1);
      roundBox.beginFill(fillColor);
      roundBox.drawRoundedRect(xPos, yPos, lineWidth, lineHeight, 1);
      roundBox.endFill();
      roundBox.x = centerX
      roundBox.y = centerY
      roundBox.pivot.set(centerX, centerY)
      roundBox.rotation = colRotation[counterCol]
      boxContainer.addChild(roundBox);
      boxes.push(roundBox)
      counterRow++
    }
    counterCol++
  }
  //  starting the regular rotations
  regularRotation(boxes)

  // for user testings
  let increment = document.getElementsByClassName("increment")[0];
  increment.addEventListener("click", function() {
    plusOne();
  });
}


function transitionToNumber () {
  let currentNumber = [1, 8, 5, 6]
  // let currentNumber = getTimeArray(new Date())
  let data = getDestsData(currentNumber, true, 360)
  // for debugging
  // let toggle = document.getElementsByClassName("toggle")[0];
  // toggle.addEventListener("click", function() {
  //   console.log('-clicked-')
  //   tl.paused(!tl.paused());
  // });
  // console.log('-prev-')
  // console.log(data)
  animateTo(data, boxes)
  setCurrentDisplayData(data)
}

function roundToFourDecimals (data) {
  return data.map((element) => {
    return Math.round(element * 10000) / 10000;
  })
}
// for getting data
function getDestsData (currentNumber, useRadians, compensateDegrees) {
  let data = getData(currentNumber)
  console.log('--before flat--')
  console.log(data)
  // flatten four into one
  data = flattenData(data);
  let radData = {}
  let compData = {}
  let roundedData = {}



  //  if return one converted to radians
  if (useRadians) {
    for (let i in data) {
      radData[i] = convertToRad(data[i]);
    }
    data = radData
  }
  //  if compenstated by degrees
  if (compensateDegrees) {
    for (let i in data) {
      compData[i] = compensateDegreesBy(data[i], 360)
    }
    data = compData
  }

  for (let i in data) {
    roundedData[i] = roundToFourDecimals(data[i]);
  }
  data = roundedData;

  console.log("--after rounded--");
  console.log(data);

  return data
}

function getTimeArray (date) {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  hours = hours < 10 ? '0' + hours : String(hours)
  minutes = minutes < 10 ? "0" + minutes : String(minutes)
  return (hours + minutes).split('')
}

//  for processing the data array
function flattenData(data) {
  let newArray = {
    red: [],
    common: [],
    dests: []
  };
  for (let i of data) {
    newArray.red = newArray.red.concat(i.red);
    newArray.common = newArray.common.concat(i.common);
    newArray.dests = newArray.dests.concat(i.dests);
  }
  return newArray;
}

function plusOne () {
  let date = getPrevTime() || new Date()
  date.setMinutes(date.getMinutes() + 1)
  setPrevTime(date)
  // let array = getTimeArray(date)
  let array = getTimeArray(new Date("Mon Apr 23 2018 18:57:43 GMT+0800 (CST)"));
  let data = getDestsData(array, true, 360)
  let prevData = getCurrentDisplayData()
  console.log('-now-')

  let newData = compareOriDest(prevData.dests, data.dests)

  // animatePartsTo(newData, boxes)
  // before animate, try compare the data and have a final list of animated lines and dests
  // animateTo(data, boxes)
}

function compareOriDest (ori, dest) {
  // get shortest first, then do the duration, rotations and delay, the last three might also need to be broken into two parts
  // let newData = compareOriDest(prevData.dests, data.dests, 8, true);
  // console.log('-checking-')
  // console.log(convertToDegree(ori))
  // console.log(convertToDegree(dest))

  // getShortestClockwiseDest(ori, dest, true)
}



function compensateDegreesBy (data, deg) {
  return data.map((element) => {
    return element + degToRad(360)
  })
}

function convertToRad(data) {
  return data.map(element => {
    return degToRad(element);
  });
}

function convertToDegree(data) {
  return data.map(element => {
    return radToDeg(element);
  });
}

// for setting initial angles
function getColStartingDegrees() {
  //  starting at 90 degrees, each column tilt 20 degrees more
  let item = [];
  for (let i = 0; i < 16; i++) {
    let increment = i * 20;
    let rad = degToRad(increment + 90);
    item.push(rad);
  }
  return item;
}

export {
  setup,
  transitionToNumber
}
