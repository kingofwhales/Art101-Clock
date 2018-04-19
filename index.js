// import * as PIXI from "pixi.js";
// import { TweenMax } from 'gsap';
// import PixiPlugin from "gsap/PixiPlugin";
import {
  setup,
  transitionToNumber
} from './src/process.js'


setup()
transitionToNumber()
// const APPLICATION = PIXI.Application
// const GRAPHICS = PIXI.Graphics
// const WIDTH = window.innerWidth;
// const HEIGHT = window.innerHeight
// const RESOLUTION = window.devicePixelRatio;

// let type = "WebGL";
// if (!PIXI.utils.isWebGLSupported()) {
//   type = "canvas";
// }

// PIXI.utils.sayHello(type);

// let app = new APPLICATION({
//   width: WIDTH,
//   height: HEIGHT,
//   antialiasing: true,
//   transparent: true,
//   resolution: RESOLUTION
// });

// let state = play

// document.body.appendChild(app.view);

// let line = new GRAPHICS();
// line.lineStyle(4, 0x000000, 1);
// line.moveTo(0, 0);
// line.lineTo(80, 0);
// line.x = 32;
// line.y = 32;
// app.stage.addChild(line);

// app.ticker.add(delta => gameLoop(delta));

// function gameLoop (delta) {
//   state(delta);
// }

// function play (delta) {
//   line.rotation += 0.1
// }

// setTimeout(function () {
//   TweenMax.to(line, 4, {
//     pixi: { rotation: 60 }
//   });
// }, 4000)
