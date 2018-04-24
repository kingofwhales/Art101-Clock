// import * as PIXI from "pixi.js";
// import { TweenMax } from 'gsap';
// import PixiPlugin from "gsap/PixiPlugin";
import {
  setup,
  transitionToNumber
} from './src/process.js'

// set up draw board
setup()

// after some delay, prepare the transitioning to number
setTimeout(() => {
  transitionToNumber();
}, 0)
