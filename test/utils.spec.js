const { expect } = require("chai")

import {
  combine,
  arrayPlusOne,
  getShortestClockwiseDest,
  getShortestDestsClockwise
} from "../src/utils.js";

describe("Combine two arrays in an one by one order", function() {
  describe("combine [1,3,5] and [2, 4, 6]", function() {
    it("should be [1, 2, 3, 4, 5, 6]", function() {
      let a = [1, 3, 5]
      let b = [2, 4, 6]
      let result = [1, 2, 3, 4, 5, 6]
      expect(combine(a, b)).to.eql(result)
    })
  })
  describe("combine [1,3] and [2, 4, 6, 7]", function() {
    it("should throw lengths different error", function() {
      let a = [1, 3]
      let b = [2, 4, 6, 7]
      expect(() =>
        combine(a, b)
      ).to.throw("two arrays have different length")
    });
  });
})

// describe("Negative: compare arrays of destinations and original points", () => {
//   describe("provided dests and origins, use degrees ", () => {
//     it("should be shortest paths", () => {
//       let ori = [-135, -135];
//       let dest = [-90, -180];
//       let shortestDest = [-0, -270];
//       expect(getShortestClockwiseDest(ori, dest, false)).to.eql(shortestDest);
//     });
//   });
// });

describe("compare arrays of destinations and original points", () => {
  describe("provided dests and origins, use degrees ", () => {
    it("should be shortest paths", () => {
      let ori = [-135, -135];
      let dest = [-90, -180];
      let shortestDest = [-0, -270];
      expect(getShortestClockwiseDest(ori, dest, false)).to.eql(shortestDest);
    });
  });
  describe("provided negative dests and origins, use degrees ", () => {
    it("should be shortest paths", () => {
      let ori = [-135, -135];
      let dest = [-90, -180];
      let shortestDest = [-0, -270];
      expect(getShortestClockwiseDest(ori, dest, false)).to.eql(shortestDest);
    });
  });
  describe("provided bigger than 360 dests and origins, use degrees ", () => {
    it("should be shortest paths", () => {
      let ori = [-135, -135];
      let dest = [-90, -180];
      let shortestDest = [-0, -270];
      expect(getShortestClockwiseDest(ori, dest, false)).to.eql(shortestDest);
    });
  });
});

// describe("compare arrays of destinations and original points", () => {
//   describe("provided dests and origins, use degrees ", () => {
//     it("should be shortest paths", () => {
//       let ori = [270, 360, 180, 270, 135, 135]
//       let dest = [270, 360, 270, 270, 270, 270]
//       let shortestDest = [270, 360, 270, 270, 270, 270]
//       expect(getShortestClockwiseDest(ori, dest, false)).to.eql(shortestDest)
//     })
//   })
//   describe("provided dests and origins, use degrees ", () => {
//     it("should be shortest paths", () => {
//       let ori = [360, 360, 180, 270, 0, 90, 180, 270 ];
//       let dest = [270, 270,270, 270, 0, 0, 90, 180 ];
//       let shortestDest = [90, 90, 270, 270, 180, 180, 0, 270 ];
//       expect(getShortestClockwiseDest(ori, dest, false)).to.eql(shortestDest);
//     });
//   });
//   describe("provided dests and origins, use degrees ", () => {
//     it("should be shortest paths", () => {
//       let ori = [720, 720, 540, 630, 360, 450, 540, 630];
//       let dest = [630, 630, 630, 630, 360, 360, 450, 540];
//       let shortestDest = [450, 450, 630, 630, 540, 540, 360, 630];
//       expect(getShortestClockwiseDest(ori, dest, false)).to.eql(shortestDest);
//     });
//   });
//   // describe("provided dests and origins, use degrees ", () => {
//   //   it("should be shortest paths", () => {
//   //     let ori = [-135, -135];
//   //     let dest = [-90, -180];
//   //     let shortestDest = [-0, -270];
//   //     expect(getShortestClockwiseDest(ori, dest, false)).to.eql(shortestDest);
//   //   });
//   // });
//   describe("provided dests and origins, use radians ", () => {
//     it("should be shortest paths", () => {
//       let ori = [6.2832, 6.2832, 3.1416, 4.7124, 0, 1.5708, 3.1416, 4.7124, 4.7124, 6.2832, 3.1416, 4.7124, 2.3562, 2.3562];
//       let dest = [4.7124, 4.7124, 4.7124, 4.7124, 0, 0, 1.5708, 3.1416, 4.7124, 6.2832, 4.7124, 4.7124, 4.7124, 4.7124];
//       let shortestDest = [1.5708099999999998, 1.5708099999999998, 4.7124, 4.7124, 3.14159, 3.14159, 0.000010000000000065512, 4.71239, 4.7124, 6.2832, 4.7124, 4.7124, 4.7124, 4.7124];
//       expect(getShortestClockwiseDest(ori, dest, true)).to.eql(shortestDest);
//     });
//   });
// })
