import {
  getCurrentTimeline,
  getPrevTime,
  setPrevTime,
  setIsTabActive,
  getIsTabActive
} from './store.js'

import {
  plusOne,
  updateDisplayTime
} from './animate.js'


function prepareUpdates() {
  attachIncrementListener();
  installVisibilityListener();
  updateEveryMinuteOnTime()
}

function updateEveryMinuteOnTime () {
  const ONE_MINUTE = 60000;
  repeatEvery(updateToCurrentTime, ONE_MINUTE);
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
  if (!tl.isActive() && ifTimeChanged) {
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
  const now = new Date()
  const delay = interval - now % interval
  function start() {
    func()
    setInterval(func, interval)
  }
  setTimeout(start, delay)
}






export {
  prepareUpdates
}
