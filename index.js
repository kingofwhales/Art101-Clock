import {TimelineMax} from 'gsap'
// import {CustomEase} from './node_modules/gsap/CustomEase.min.js'

import {
  setUp
} from './src/draw.js'

import {
  iniRotations,
  transitionToNumber
} from './src/animate.js'


import {
  getShortestClockwiseDest,
  getShortestClockwiseNegativeDest,
  compareOriDest
} from "./src/utils.js"




const masterTimeline = new TimelineMax()
masterTimeline.add(setUp, 0);
masterTimeline.add(iniRotations, 2)
masterTimeline.add(transitionToNumber, 3)


// we are at refactoring transtiontonumber structure.





// how do i refactor?
// what's my methodology? that is tested against failures
// 1. readability: if you can't understan the code in 3 seconds/ or you are more than 20 lines .etc, refactor it.
// 2. structure: if you can't immediately tell what's in this module, refactor it.
// 3. testability: can i trust you ?  Write the test first, rather than the implementation first?
// 4. scalability: in what way will you grow? can you grow easily?

// Do I understand you?
// Do I trust you?
// Can I find you?
// Can I grow you?

// start along with how the program proceed....
// first step users visit...



// const oneMinute = 60000
// const delay = 4000

// attachIncrementListener()
// setTimeout(() => {
//   repeatEvery(updateToCurrentTime, ONE_MINUTE)
//   // setInterval(updateToCurrentTime, ONE_MINUTE)
// }, DELAY * 3 )


var hidden, visibilityChange
let isTabActive = true

if (typeof document.hidden !== "undefined") {
  // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden"
  visibilityChange = "visibilitychange"
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden"
  visibilityChange = "msvisibilitychange"
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden"
  visibilityChange = "webkitvisibilitychange"
}


// If the page is hidden, pause the video
// if the page is shown, play the video
function handleVisibilityChange() {
  if (document[hidden]) {
    isTabActive = false
  } else {
    isTabActive = true
    checkTimeCorrect()
  }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (
  typeof document.addEventListener === "undefined" ||
  typeof document.hidden === "undefined"
) {
  console.log(
    "This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."
  )
} else {
  // Handle page visibility change
  // document.addEventListener(visibilityChange, handleVisibilityChange, false)
}


function attachIncrementListener () {
  let btn = document.getElementsByClassName('increment')[0]
  btn.addEventListener("click", function() {
    if (!tl.isActive()) {
      console.log('-not active-')
      plusOne()
    } else {
      console.log('-active-')
    }
  })
}

function toggleButtonVisibility () {
  let btn = document.getElementsByClassName("increment")[0]
  let tl = new TimelineMax()
  tl.to(btn, 2, {
    opacity:0
  })
}

function checkTimeCorrect () {
  console.log('--checking--')
  let date = new Date()
  let prevTime = getPrevTime()
  // console.log(tl.isActive())
  // console.log(date)
  // console.log(prevTime)
  if (!tl.isActive() && (date.getHours() !== prevTime.getHours() || date.getMinutes() !== prevTime.getMinutes())){
    // console.log('-check time correct-')
    setPrevTime(date)
    comparePrevDest(date)
  }
}



function updateToCurrentTime () {
  // only run when not active
  // let date = new Date()
  // let prevTime = getPrevTime()
  // let sameTime = false
  // // // console.log('--running interval func---')

  // if (date.getHours() === prevTime.getHours() && date.getMinutes()=== prevTime.getMinutes()){
  //   // console.log('--same time--')
  //   // console.log(date.getHours())
  //   // console.log(date.getMinutes())
  //   // console.log(prevTime.getHours())
  //   // console.log(prevTime.getMinutes())
  //   sameTime = true
  // }
  // if (!tl.isActive() && !sameTime && isTabActive) {
  if (!tl.isActive() && isTabActive) {
    // console.log("---actually updating---")
    let date = new Date()
    setPrevTime(date)
    comparePrevDest(date)
  }
}

function plusOne () {
  console.log('plus one')
  let date = getPlusOneTime()
  // let array = getTimeArray(date)
  comparePrevDest(date)

  // let newData = compareOriDest(prevData.dests, data.dests)

}

function getPlusOneTime () {
  let date = getPrevTime() || new Date()
  date.setMinutes(date.getMinutes() + 1)
  setPrevTime(date)
  return date
}

// updates hourly and disable button before animation done?

function comparePrevDest (date) {
  let array = getTimeArray(date)
  // let array = getTimeArray(new Date("Mon Apr 23 2018 12:17:43 GMT+0800 (CST)"))
  let data = getDestsData(array, true, 0)
  let prevData = getCurrentDisplayData()
  // console.log('-dest data-')
  // console.log(data)
  // console.log('-ori data-')
  // console.log(prevData)
  let shortestPaths
  if (prevData[0] < 0) {
    shortestPaths = getShortestClockwiseNegativeDest(prevData, data, true)
  } else {
    shortestPaths = getShortestClockwiseDest(prevData, data, true)
  }

  let finalData = compareOriDest(prevData, data, 8, true)
    // console.log("---prev--")
    // console.log(prevData)
    // console.log("---dest--")
    // console.log(data)
    // console.log("---shortest--")
    // console.log(shortestPaths)
    // console.log('---final--')
    // console.log(finalData)
  // animateToTarget(shortestPaths,cubesCollection)
  animatePartsTo(finalData, cubesCollection)
  setCurrentDisplayData(data)
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
