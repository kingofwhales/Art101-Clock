const { expect } = require("chai")

import {
  combine,
  arrayPlusOne,
  getShortestClockwiseDest
} from "../src/utils.js"

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

describe("compare arrays of destinations and original points", () => {
  describe("provided dests and origins, use degrees ", () => {
    it("should be shortest paths", () => {
      let ori = [270, 360, 180, 270, 135, 135]
      let dest = [270, 360, 270, 270, 270, 270]
      let shortestDest = [270, 360, 270, 270, 270, 270]
      expect(getShortestClockwiseDest(ori, dest, false)).to.eql(shortestDest)
    })
  })
  describe("provided dests and origins, use degrees ", () => {
    it("should be shortest paths", () => {
      let ori = [360, 360, 180, 270, 0, 90, 180, 270 ];
      let dest = [270, 270,270, 270, 0, 0, 90, 180 ];
      let shortestDest = [90, 90, 270, 270, 180, 180, 0, 270 ];
      expect(getShortestClockwiseDest(ori, dest, false)).to.eql(shortestDest);
    });
  });
  describe("provided dests and origins, use radians ", () => {
    it("should be shortest paths", () => {
      let ori = [6.2832, 6.2832, 3.1416, 4.7124, 0, 1.5708, 3.1416, 4.7124, 4.7124, 6.2832, 3.1416, 4.7124, 2.3562, 2.3562];
      let dest = [4.7124, 4.7124, 4.7124, 4.7124, 0, 0, 1.5708, 3.1416, 4.7124, 6.2832, 4.7124, 4.7124, 4.7124, 4.7124];
      let shortestDest = [1.5708099999999998, 1.5708099999999998, 4.7124, 4.7124, 3.14159, 3.14159, 0.000010000000000065512, 4.71239, 4.7124, 6.2832, 4.7124, 4.7124, 4.7124, 4.7124];
      expect(getShortestClockwiseDest(ori, dest, true)).to.eql(shortestDest);
    });
  });
})


// describe("compare arrays of destinations and original points", () => {
//   describe("provided dests and origins, degrees and 8 durations", () => {
//     it("should be right final values", () => {
//       let duration = 8
//       let useRadians = false
//       let ori = [270, 360, 270, 270, 180, 270, 360, 90, 90, 180, 360, 360]
//       let dest = [270, 360, 360, 360, 270, 360, 360, 360, 90, 180, 270, 360]
//       let result = [
//         {
//           delay: 0,
//           duration: 0,
//           diff: 0
//         },
//         {
//           delay: 0,
//           duration: 0,
//           diff: 0
//         },
//         {
//           delay: 0,
//           duration: 2,
//           diff: 90
//         },
//         {
//           delay: 0,
//           duration: 2,
//           diff: 90
//         },
//         {
//           delay: 0,
//           duration: 2,
//           diff: 90
//         },
//         {
//           delay: 2,
//           duration: 2,
//           diff: 90
//         },
//         {
//           delay: 0,
//           duration: 4,
//           diff: 180
//         },
//         {
//           delay: 2,
//           duration: 2,
//           diff: 90
//         },
//         {
//           delay: 0,
//           duration: 0,
//           diff: 0
//         },
//         {
//           delay: 0,
//           duration: 0,
//           diff: 0
//         },
//         {
//           delay: 0,
//           duration: 0,
//           diff: 0
//         },
//         {
//           delay: 0,
//           duration: 0,
//           diff: 0
//         }
//       ]

//     })
//   })
// })

// describe("array plus one", () => {
//   describe("when current time array is 1, 3, 0, 5", () => {
//     it("should be 1, 3, 0, 6", () => {
//       let a = ["1", "3", "0", "5"]
//       let result = ["1", "3", "0", "6"]
//       expect(arrayPlusOne(a)).to.eql(result)
//     })
//   })
//   describe("when current time array is 1, 3, 5, 9", () => {
//     it("should be 1, 4, 0, 0", () => {
//       let a = ["1", "3", "5", "9"];
//       let result = ["1", "4", "0", "0"];
//       expect(arrayPlusOne(a)).to.eql(result);
//     })
//   })
//   describe("when current time array is 1, 3, 0, 9", () => {
//     it("should be 1, 3, 1, 0", () => {
//       let a = ["1", "3", "0", "9"];
//       let result = ["1", "3", "1", "0"];
//       expect(arrayPlusOne(a)).to.eql(result);     
//     })
//   })
//   describe("when current time array is 1, 9, 5, 9", () => {
//     it("should be 2, 0, 0, 0", () => {
//       let a = ["1", "9", "5", "9"];
//       let result = ["2", "0", "0", "0"];
//       expect(arrayPlusOne(a)).to.eql(result);      
//     })
//   })
//   describe("when current time array is 2, 3, 5, 9", () => {
//     it("should be 0, 0, 0, 0", () => {
//       let a = ["2", "3", "5", "9"];
//       let result = ["0", "0", "0", "0"];
//       expect(arrayPlusOne(a)).to.eql(result);
//     })
//   })
//   describe("when current time array is 0, 0, 0, 0", () => {
//     it("should be 0, 0, 0, 1", () => {
//       let a = ["0", "0", "0", "0"];
//       let result = ["0", "0", "0", "1"];
//       expect(arrayPlusOne(a)).to.eql(result);
//     });
//   });
// })
