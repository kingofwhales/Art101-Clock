const { expect } = require("chai")

import {
  getTimeArray
} from "../src/utils.js";

describe("Get time array from date objects", function() {
  describe("get time", function() {
    it("should return right array objects", function() {
      const date = new Date("June 2, 2018 18:59:59")
      const result = ["1", "8", "5", "9"]
      expect(getTimeArray(date)).to.eql(result)
    })
  })
  describe("get time", function () {
    it("should return right array objects", function () {
      const date = new Date("April 2, 2018 01:12:09")
      const result = ["0", "1", "1", "2"]
      expect(getTimeArray(date)).to.eql(result)
    })
  })
})
