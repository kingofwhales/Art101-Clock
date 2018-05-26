import {
  getCurrentTimeline,
  getPrevTime,
  setPrevTime,
  setIsTabActive,
  getIsTabActive
} from './store.js'

import {
  updateDisplayTime
} from './transition.js'

import {
  getPlusOneTime
} from './utils.js'

function prepareWatchers() {
  attachIncrementListener(); // plus one
  installVisibilityListener(); // visible gain update
  updateEveryMinuteOnTime() // on the clock update
}

function updateEveryMinuteOnTime () {
  const ONE_MINUTE = 60000;
  repeatEvery(updateToCurrentTime, ONE_MINUTE);
}

// why is directly exporting not undefined?
// plus one part. own logic to get plus one, then pass it to final decision point
function attachIncrementListener() {
  const btn = document.getElementsByClassName('increment')[0]
  btn.addEventListener("click", plusOne, false)
}

function plusOne () {
  const time = getPrevTime()
  const plusOneMinuteTime = getPlusOneTime(time)
  isTimelineFreeForUpdates(plusOneMinuteTime)
}

// visiblity part, own logic to check if time has changed when it becomes visible again. then pass it to final decision point
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
  const isTimeDifferent = date.getHours() !== prevTime.getHours() ||
    date.getMinutes() !== prevTime.getMinutes()
  if (isTimeDifferent) {
    isTimelineFreeForUpdates(date)
  }
}

//  repeat every minute part
// pass date to final decision point
function repeatEvery(func, interval) {
  const now = new Date()
  const delay = interval - now % interval
  function start() {
    func()
    setInterval(func, interval)
  }
  setTimeout(start, delay)
}



function updateToCurrentTime() {
  const date = new Date();
  isTimelineFreeForUpdates(date);
}

// final decision point
function isTimelineFreeForUpdates(date) {
  const tl = getCurrentTimeline()
  const isTabActive = getIsTabActive()
  if (tl.isActive() === false && isTabActive) {
    updateDisplayTime(date)
  }
}






export {
  prepareWatchers
}
