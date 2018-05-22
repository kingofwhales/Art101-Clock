const { expect } = require("chai");

import {
  generateDestinationsData,
  transformDataStructureForTransitionTo,
  compareOriDest,
  getActualDistance
} from "../src/animate.js";

// describe("generate destinations data based on targets", function () {
//   describe("input data array radians", function () {
//     it("output the right destination array of objects", function () {
//       const data = [
//         4.7124,
//         6.2832,
//         3.1416,
//         4.7124,
//         2.3562,
//         2.3562,
//         2.3562,
//         2.3562,
//         4.7124,
//         6.2832
//       ]
//       const result = [
//         { duration: 4, delay: 0, destination: 4.7124 },
//         { duration: 1, delay: 4, destination: 6.2832 },
//         { duration: 4, delay: 0.08, destination: 3.1416 },
//         { duration: 1, delay: 4.08, destination: 4.7124 },
//         { duration: 4, delay: 0.16, destination: 2.3562 },
//         { duration: 0, delay: 4.16, destination: 2.3562 },
//         { duration: 4, delay: 0.24, destination: 2.3562 },
//         { duration: 0, delay: 4.24, destination: 2.3562 },
//         { duration: 4, delay: 0.32, destination: 4.7124 },
//         { duration: 1, delay: 4.32, destination: 6.2832 }
//       ]
//       const transitionToDuration = 4
//       const transitionToDelay = 0.08
//       expect(generateDestinationsData(data, transitionToDuration, transitionToDelay)).to.eql(result)
//     })
//   })
//   describe("input data array degrees", function () {
//     it("output the right destination array of objects", function () {
//       const data = [
//         180, 270,
//         135, 135,
//         45, 45,
//         180, 180,
//         270, 360
//       ]
//       const result = [
//         { duration: 4, delay: 0, destination: 180 },
//         { duration: 1, delay: 4, destination: 270 },
//         { duration: 4, delay: 0.08, destination: 135 },
//         { duration: 0, delay: 4.08, destination: 135 },
//         { duration: 4, delay: 0.16, destination: 45 },
//         { duration: 0, delay: 4.16, destination: 45 },
//         { duration: 4, delay: 0.24, destination: 180 },
//         { duration: 0, delay: 4.24, destination: 180 },
//         { duration: 4, delay: 0.32, destination: 270 },
//         { duration: 1, delay: 4.32, destination: 360 }
//       ]
//       const transitionToDuration = 4
//       const transitionToDelay = 0.08
//       expect(generateDestinationsData(data, transitionToDuration, transitionToDelay)).to.eql(result);
//     })
//   })
// })

// describe("duplicate either odd or even items in array", () => {
//   describe("dup odd item", () => {
//     it("should be 1,1,2,1,1,2 ", () => {
//       const data = [
//         4.7124,
//         6.2832,
//         3.1416,
//         4.7124,
//         2.3562,
//         2.3562,
//         2.3562,
//         2.3562,
//         4.7124,
//         6.2832
//       ]
//       const result = [
//         4.7124,
//         4.7124,
//         6.2832,
//         3.1416,
//         3.1416,
//         4.7124,
//         2.3562,
//         2.3562,
//         2.3562,
//         2.3562,
//         2.3562,
//         2.3562,
//         4.7124,
//         4.7124,
//         6.2832
//       ]
//       expect(transformDataStructureForTransitionTo(data, true)).to.eql(result)
//     })
//   })
//   describe("dup even item", () => {
//     it("should be 1, 2,2 ,1, 2,2", () => {
//       const data = [
//         180, 270,
//         135, 135,
//         45, 45,
//         180, 180,
//         270, 360
//       ]
//       const result = [
//         180, 270, 270,
//         135, 135, 135,
//         45, 45, 45,
//         180, 180, 180,
//         270, 360, 360
//       ]
//       expect(transformDataStructureForTransitionTo(data, false)).to.eql(result)
//     })
//   })
// })


// describe("compare prev and dest to get desirable dest info structure", () => {
//   describe("10 items", () => {
//     it("should be right ", () => {
//       const prev = [
//         4.7124,
//         4.7124,
//         4.7124,
//         4.7124,
//         3.1416,
//         4.7124,
//         6.2832,
//         1.5708
//       ]
//       const dest = [
//         6.2832,
//         1.5708,
//         1.5708,
//         3.1416,
//         6.2832,
//         6.2832,
//         6.2832,
//         1.5708
//       ]
//       const result = [
//         { delay: 1.6, duration: 1.5, destination: 6.2832, original: 4.7124 },
//         { delay: 1.6, duration: 3, destination: 1.5708, original: 4.7124 },
//         { delay: 1.68, duration: 3, destination: 1.5708, original: 4.7124 },
//         { delay: 1.68, duration: 4.5, destination: 3.1416, original: 4.7124 },
//         { delay: 1.76, duration: 3, destination: 6.2832, original: 3.1416 },
//         { delay: 3.26, duration: 1.5, destination: 6.2832, original: 4.7124 },
//         { delay: 1.84, duration: 0, destination: 6.2832, original: 6.2832 },
//         { delay: 1.84, duration: 0, destination: 1.5708, original: 1.5708 }
//       ]
//       const loopDuration = 6
//       const rootDelay = 1.6
//       expect(compareOriDest(prev, dest, loopDuration, rootDelay)).to.eql(result);
//     });
//   });
//   // describe("dup even item", () => {
//   //   it("should be 1, 2,2 ,1, 2,2", () => {

//   //     expect(transformDataStructureForTransitionTo(data, false)).to.eql(result);
//   //   });
//   // });
// });


describe("Clockwise rotation: get actual traveled distance between two rotational angles", () => {
  // describe("positive big to positive small: smaller than 360 diff", () => {
  //   it("should be right ", () => {
  //     const originalRot = 5.23599
  //     const destinationRot = 3.14159
  //     const result = 4.1888;
  //     expect(getActualDistance(originalRot, destinationRot)).to.eql(
  //       result
  //     );
  //   });
  // });
  // describe("positive big to positive small: smaller than 360 diff", () => {
  //   it("should be right ", () => {
  //     const originalRot = 6.28319;
  //     const destinationRot = 1.5708;
  //     const result = 1.5708;
  //     expect(getActualDistance(originalRot, destinationRot)).to.eql(
  //       result
  //     );
  //   });
  // });
  // describe("positive big to positive small: smaller than 360 diff", () => {
  //   it("should be right ", () => {
  //     const originalRot = 6.28319;
  //     const destinationRot = 4.71239;
  //     const result = 4.7124;
  //     expect(getActualDistance(originalRot, destinationRot)).to.eql(
  //       result
  //     );
  //   });
  // });
  // describe("positive big to positive small: bigger than 360 diff", () => {
  //   it("should be right ", () => {
  //     const originalRot = 18.84956;
  //     const destinationRot = 4.71239;
  //     const result = 17.2788;
  //     expect(getActualDistance(originalRot, destinationRot)).to.eql(
  //       result
  //     );
  //   });
  // });
  // describe("positive small to postive big: smaller than 360 diff", () => {
  //   it("should be right ", () => {
  //     expect(getActualDistance(originalRot, destinationRot)).to.eql(result);
  //   });
  // });
  // describe("positive small to postive big: bigger than 360 diff", () => {
  //   it("should be right ", () => {
  //     expect(getActualDistance(originalRot, destinationRot)).to.eql(result);
  //   });
  // });
  // describe("positive to negative: smaller than 360 diff", () => {
  //   it("should be right ", () => {
  //     expect(getActualDistance(originalRot, destinationRot)).to.eql(result);
  //   });
  // });
  // describe("positive to negative: bigger than 360 diff", () => {
  //   it("should be right ", () => {
  //     expect(getActualDistance(originalRot, destinationRot)).to.eql(result);
  //   });
  // });
  // describe("negative to postive: smaller than 360 diff", () => {
  //   it("should be right ", () => {
  //     expect(getActualDistance(originalRot, destinationRot)).to.eql(result);
  //   });
  // });
  // describe("negative to postive: bigger than 360 diff", () => {
  //   it("should be right ", () => {
  //     expect(getActualDistance(originalRot, destinationRot)).to.eql(result);
  //   });
  // });
  describe("negative big to negative small: smaller than 360 diff", () => {
    it("should be right ", () => {
      const originalRot = -3.14159 
      const destinationRot = -5.23599
      const result = 2.0944;
      expect(getActualDistance(originalRot, destinationRot)).to.eql(
        result
      );
    });
  });
  describe("negative small to negative big: smaller than 360 diff", () => {
    it("should be right ", () => {
      const originalRot = -5.23599
      const destinationRot = -3.14159
      const result = 4.1888;
      expect(getActualDistance(originalRot, destinationRot)).to.eql(
        result
      );
    });
  });
  describe("negative big to negative small: bigger than 360 diff", () => {
    it("should be right ", () => {
      const originalRot = -18.8496
      const destinationRot = -4.71239
      const result = 17.2787;
      expect(getActualDistance(originalRot, destinationRot)).to.eql(
        result
      );
    });
  });
  describe("negative big to negative small: bigger than 360 diff", () => {
    it("should be right ", () => {
      const originalRot = -18.8496
      const destinationRot = -1.5708;
      const result = 14.1371;
      expect(getActualDistance(originalRot, destinationRot)).to.eql(
        result
      );
    });
  });
  describe("negative big to negative small: bigger than 360 diff", () => {
    it("should be right ", () => {
      const originalRot = -7.6445;
      const destinationRot = -4.7124;
      const result = 3.3511;
      expect(getActualDistance(originalRot, destinationRot)).to.eql(result);
    });
  });
  describe("positive to negative: smaller than 360 diff", () => {
    it("should be right ", () => {
      const originalRot = 3.14159;
      const destinationRot = -1.5708;
      const result = 4.7124;
      expect(getActualDistance(originalRot, destinationRot)).to.eql(
        result
      );
    });
  });

  describe("positive to negative: bigger than 360 diff", () => {
    it("should be right ", () => {
      const originalRot = 18.8496
      const destinationRot = -1.5708;
      const result = 20.4204;
      expect(getActualDistance(originalRot, destinationRot)).to.eql(
        result
      );
    });
  });

  describe("0 to negative", () => {
    it("should be right ", () => {
      const originalRot = 0
      const destinationRot = -1.5708;
      const result = 1.5708;
      expect(getActualDistance(originalRot, destinationRot)).to.eql(
        result
      );
    });
  });
  // make sure it's fully tested
  // 
});
