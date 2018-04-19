import * as PIXI from "pixi.js";
import {
  TimelineMax, Power0
} from 'gsap'
import PixiPlugin from "gsap/PixiPlugin";

import {
  getData
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
yDis = HEIGHT / 12

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
      xPos = divident * lineWidth + counterCol * (7/3) * lineWidth + offset * 4
      yPos = level * yDis
      let centerX = counterCol * (7 / 3) * lineWidth + lineWidth;
      let centerY = yPos + lineHeight / 2;
      let roundBox = new GRAPHICS();
      roundBox.lineStyle(2, 0xff9933, 1);
      roundBox.beginFill(0xff9933);
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

  let tl = new TimelineMax()
  tl.to(boxes, 4, {
    pixi: {
      rotation: "+=360"
    },
    ease: Power0.easeNone,
    repeat: -1
  });
  // app.ticker.add(delta => gameLoop(delta));

}

function gameLoop (delta) {
  state(delta);
}

function play (delta) {
  for (let i of boxes) {
    // four seconds one loop. every frame 1.5 degrees converted to rads is 0.027965
    i.rotation += 0.028
  }
}

function degToRad (deg) {
  return deg * Math.PI / 180;
}

function transitionToNumber () {
  // for (let i of boxes) {
  console.log('---running tran to num----')
  console.log(getData())
  // setTimeout(function () {
  //   let tl = new TimelineMax();
  //   tl.to(boxes, 8, {
  //     pixi: {
  //       rotation: "1080"
  //     },
  //     ease: Power0.easeNone
  //   });
  // }, 1000)
}

export {
  setup,
  transitionToNumber
}
