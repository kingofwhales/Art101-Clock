import * as PIXI from "pixi.js";
import {
  TimelineMax, Power0
} from 'gsap'
import PixiPlugin from "gsap/PixiPlugin";

import {
  getData,
  combine
} from './store.js'

const APPLICATION = PIXI.Application
const GRAPHICS = PIXI.Graphics
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight
const RESOLUTION = window.devicePixelRatio;
const CONTAINER = PIXI.Container

let app, xPos, yPos, xDis, yDis, lineWidth, lineHeight, counterRow, boxes, counterCol, boxContainer

let state = play

// responsive length for boxes. gap is 1/4 of one full line. left and right margin is one full line.
lineWidth = (WIDTH / 87) * 2
xDis = lineWidth / 2
yDis = HEIGHT / 10

let colRotation = []
for (let i = 0; i < 16; i++) {
  let increment = i * 20
  let rad = degToRad(increment + 90)
  colRotation.push(rad)
}
// console.log(colRotation)

function setup () {
  let app = new APPLICATION({
    width: WIDTH,
    height: HEIGHT,
    antialias: true,
    transparent: true,
    resolution: RESOLUTION
  })
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
  document.body.appendChild(app.view);

  // yDis = 80
  lineHeight = 4
  // lineWidth = 10
  counterRow = 0
  counterCol = 0
  boxes = []

  // console.log("--inner width--");
  // console.log(WIDTH);
  // console.log(lineWidth);
  // console.log(xDis)

  boxContainer = new CONTAINER();
  boxContainer.x = 100
  boxContainer.y = 100
  app.stage.addChild(boxContainer);

  while (counterCol < 16) {
    counterRow = 0
    // console.log('-heh-')
    while (counterRow < 12) {
      // console.log('-what-')
      let divident = counterRow % 2
      let level = Math.floor(counterRow / 2)
      let offset = divident === 0 ? 1 : -1
      xPos = divident * lineWidth + counterCol * (7/3) * lineWidth + offset * 2
      yPos = level * yDis
      // let color = divident === 0 ? 0x000000 : 0xed33332
      let color = 0xff9933
      let centerX = counterCol * (7 / 3) * lineWidth + lineWidth;
      let centerY = yPos + lineHeight / 2;
      let roundBox = new GRAPHICS();
      roundBox.lineStyle(2, 0xff9933, 1);
      roundBox.beginFill(color);
      roundBox.drawRoundedRect(xPos, yPos, lineWidth, lineHeight, 1);
      roundBox.endFill();
      roundBox.x = centerX
      roundBox.y = centerY
      roundBox.pivot.set(centerX, centerY)
      roundBox.rotation = colRotation[counterCol]
      boxContainer.addChild(roundBox);
      boxes.push(roundBox)
      // lines.push(line)
      counterRow++
    }
    counterCol++
  }

  // let rectangle = new GRAPHICS();
  // rectangle.lineStyle(4, 0xff3300, 1);
  // rectangle.beginFill(0x66ccff);
  // rectangle.drawRect(0, 0, 64, 64);
  // rectangle.endFill();
  // rectangle.x = 170;
  // rectangle.y = 170;
  // app.stage.addChild(rectangle);

  regularRotation()
  // app.ticker.add(delta => gameLoop(delta));

}

function regularRotation () {
  let tl = new TimelineMax();
  tl.to(boxes, 8, {
    pixi: {
      rotation: "+=360"
    },
    ease: Power0.easeNone,
    repeat: -1
  });
}
function gameLoop (delta) {
  state(delta);
}

// let data = getData(1,3,6,0)
// console.log(data)
// let flatData = flattenData (data)
// let flatDataCommon = flatData.common
// let flatDataRed = flatData.red
// let radCommon = convertToRad(flatDataCommon)
// let radRed = convertToRad(flatDataRed);
// let allRad = combine(radCommon, radRed)
// let addLoopAllRad = allRad.map((element) => {
//   return element + 6.28
// })
function play (delta) {
  let counter = 0
  for (let i of boxes) {
    // four seconds one loop. every frame 1.5 degrees converted to rads is 0.027965
    // console.log(i.rotation)
    if (i.rotation < addLoopAllRad[counter]) {
      i.rotation += 0.014
    }
    counter++
  }
}

function degToRad (deg) {
  return deg * Math.PI / 180;
}
function radToDeg (rad) {
  return rad * 180 / Math.PI
}

function convertToRad(data) {
  return data.map((element) => {
    return degToRad(element)
  })
}

const SPPED = degToRad(360) / 8

function transitionToNumber () {
  // for (let i of boxes) {
  console.log('---running tran to num----')
  let data = getData(1,3,6,0)
  console.log(data)
  let flatData = flattenData (data)
  let flatDataCommon = flatData.common
  let flatDataRed = flatData.red
  let radCommon = convertToRad(flatDataCommon)
  let radRed = convertToRad(flatDataRed);
  // console.log(radCommon)
  // console.log(radRed)


  let tl = new TimelineMax();

  let toggle = document.getElementsByClassName("toggle")[0];
  toggle.addEventListener("click", function() {
    console.log('-clicked-')
    tl.paused(!tl.paused());
  });
  let counter = 0
  let redCounter = 0
  let delay = 0
  let duration = 8
  for (let i of radCommon) {
    let commonRot = i + degToRad(360)
    let redRot = radRed[redCounter] + degToRad(360)

    // let commonPrev = radToDeg(boxes[counter].rotation)
    // let redPrev = radToDeg(boxes[counter+1].rotation)
    // console.log(commonPrev)

    // let commonDiff = commonRot - commonPrev > 0 ? commonRot - commonPrev : 360 - (commonRot - commonPrev);
    // let diff = Math.abs(commonRot - boxes[counter].rotation)
    // let duration = diff / SPPED
  
    tl.to(boxes[counter], duration, {
      // pixi: {
      //   rotation: `+=${commonDiff}`
      // },
      directionalRotation: {
        rotation: commonRot + "_cw",
        useRadians: true
      },
      ease: Power0.easeNone
    }, delay)

    tl.to(boxes[counter+1], duration, {
      // pixi: {
      //   rotation: `+=${commonDiff}`
      // },
      directionalRotation: {
        rotation: commonRot + "_cw",
        useRadians: true
      },
      ease: Power0.easeNone
    }, delay)

    tl.to(boxes[counter+1], 2, {
      directionalRotation: {
        rotation: redRot + "_cw",
        useRadians: true
      },
      ease: Power0.easeNone
    }, duration + delay)

    counter += 2
    delay += 0.2
    redCounter++
  }
  // setTimeout(function () {
  //   let tl = new TimelineMax();
  //   tl.to(boxes, 8, {
  //     pixi: {
  //       rotation: flatData[]
  //     },
  //     ease: Power0.easeNone
  //   });
  // }, 1000)
}

function flattenData (data) {
  let newArray = {
    red: [],
    common: []
  }
  for (let i of data) {
    newArray.red = newArray.red.concat(i.red)
    newArray.common = newArray.common.concat(i.common)
  }
  return newArray
}
export {
  setup,
  transitionToNumber
}
