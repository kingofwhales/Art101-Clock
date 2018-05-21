const { expect } = require("chai");

import {
  getBoxesPositionsAlt
} from '../src/notSure.js'

// describe("get positions array based on inpurt", function() {
//   describe("give boxWidth, ygap, rows number and columns number", function() {
//     it("output the right positions", function() {
//       const boxWidth = 10
//       const yGap = 40
//       const rows = 2
//       const columns = 2
//       const result = [
//         {
//           "radians": 1.5707963267948966,
//           "translation": -5,
//           "xPos": -15,
//           "yPos": 20,
//         },
//         {
//           "radians": 1.5707963267948966,
//           "translation": 5,
//           "xPos": -15,
//           "yPos": 20,
//         },
//         {
//           "radians": 1.5707963267948966,
//           "translation": -5,
//           "xPos": -15,
//           "yPos": -20,
//         },
//         {
//           "radians": 1.5707963267948966,
//           "translation": 5,
//           "xPos": -15,
//           "yPos": -20,
//         },
//         {
//           "radians": 1.9198621771937625,
//           "translation": -5,
//           "xPos": 15,
//           "yPos": 20,
//         },
//         {
//           "radians": 1.9198621771937625,
//           "translation": 5,
//           "xPos": 15,
//           "yPos": 20,
//         },
//         {
//           "radians": 1.9198621771937625,
//           "translation": -5,
//           "xPos": 15,
//           "yPos": -20,
//         },
//         {
//           "radians": 1.9198621771937625,
//           "translation": 5,
//           "xPos": 15,
//           "yPos": -20,
//         },
//       ]
//       expect(getBoxesPositionsAlt(boxWidth, yGap, rows, columns)).to.eql(result)
//     })
//   })
// })
