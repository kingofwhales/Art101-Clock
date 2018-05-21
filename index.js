import {TimelineMax} from 'gsap'
// import {CustomEase} from './node_modules/gsap/CustomEase.min.js'

import {
  setUp
} from './src/draw.js'

import {
  iniRotations,
  transitionToNumber,
  prepareAnimation,
  plusOne,
  updateDisplayTime
} from './src/animate.js'


import {
  getShortestClockwiseDest,
  getShortestClockwiseNegativeDest,
  compareOriDest
} from "./src/utils.js"

import {
  getCurrentTimeline,
  getIsTabActive,
  setIsTabActive,
  getPrevTime,
  setPrevTime
} from './src/store.js'



setUp()
prepareAnimation()
// prepareUpdates()


function prepareUpdates() {
  // const masterTimeline = getCurrentTimeline()
  attachIncrementListener()
  installVisibilityListener();

  const ONE_MINUTE = 60000
  repeatEvery(updateToCurrentTime, ONE_MINUTE)

  // setInterval(updateToCurrentTime, 1000)
}

// why is directly exporting not undefined?
function attachIncrementListener() {
  const btn = document.getElementsByClassName('increment')[0]
  btn.addEventListener("click", function () {
    const masterTimeline = getCurrentTimeline()
    if (!masterTimeline.isActive()) {
      console.log('-not active-')
      console.log(masterTimeline)
      plusOne()
    } else {
      console.log('-active-')
    }
  })
}

function prepareForUpdates() {
  // installVisibilityListener();
  // checkUpdateEveryMinute();
}

function installVisibilityListener() {
  // Warn if the browser doesn't support addEventListener or the Page Visibility API
  if (
    typeof document.addEventListener === "undefined" ||
    typeof document.hidden === "undefined"
  ) {
    console.log(
      "This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."
    );
  } else {
    document.addEventListener("visibilitychange", handleVisibilityChange, false);
  }
}

function handleVisibilityChange() {
  if (document["hidden"]) {
    // console.log('-not visible-')
    setIsTabActive(false)
  } else {
    // console.log('-visible now-')
    setIsTabActive(true)
    checkTimeCorrect();
  }
}

function checkTimeCorrect() {
  const date = new Date();
  const prevTime = getPrevTime() || new Date("Thu May 17 1988 17:43:08 GMT+0800 (CST)");
  const tl = getCurrentTimeline()
  const ifTimeChanged = date.getHours() !== prevTime.getHours() ||
    date.getMinutes() !== prevTime.getMinutes()
  if (!tl.isActive() && ifTimeChanged){
    setPrevTime(date);
    updateDisplayTime(date);
  } else {
    console.log('not gonna update')
  }
}

function updateToCurrentTime() {
  const tl = getCurrentTimeline()
  const isTabActive = getIsTabActive()
  // console.log('-checking intervals-')
  console.log(tl.isActive())
  console.log(isTabActive)
  if (!tl.isActive() && isTabActive) {
    // console.log("---actually updating---")
    let date = new Date()
    setPrevTime(date)
    updateDisplayTime(date)
  }
}



function repeatEvery(func, interval) {
  // Check current time and calculate the delay until next interval
  var now = new Date(),
    delay = interval - now % interval

  function start() {
    // Execute function now...
    func()
    // ... and every interval
    setInterval(func, interval)
  }

  // Delay execution until it's an even interval
  setTimeout(start, delay)
}
