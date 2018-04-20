const { expect } = require("chai")

import {
  combine
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
