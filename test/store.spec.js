const { expect } = require("chai")

import {
  combine,
  purifyDests
} from "../src/store.js"

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

describe("remove rotations keys and leave only degrees number", function () {
  describe("provide an object", function () {
    it("should be pure", function () {
      let a = [
        {
          number: 899,
          dests: [
            {rotation: 890},
            {rotation: 1}
          ]
        },
        {
          number: 12,
          dests: [
            {rotation: 1000},
            {rotation: 199999},
            {rotation: 2}
          ]
        }
      ]
      let result = [
        {
          number: 899,
          dests: [890, 1]
        },
        {
          number: 12,
          dests: [ 1000, 199999, 2]
        }
      ]

      expect(purifyDests(a)).to.eql(result)
    })
  })
})
