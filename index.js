import * as THREE from "three"
import {TimelineMax} from 'gsap'

import {
  getData,
  getPrevTime,
  setPrevTime,
  getCurrentDisplayData,
  setCurrentDisplayData
} from './src/store.js'

import {
  getShortestClockwiseDest,
  getShortestClockwiseNegativeDest,
  compareOriDest
} from "./src/utils.js"

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

const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({ antialias: true })
const camera = new THREE.PerspectiveCamera(70, width / height, 0.001, 1500)

const cubesCollection = []
const boxWidth = Math.floor(width / 70)
const linesPositions = getLinesPositions() //6 rows, 16 columns

setUp()

function setUp() {
  createScene()
  createLight()
  createPlane()
  createLines()
  render()
}

function createScene() {
  renderer.setSize(width, height)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setClearColor(0xffffff, 1)
  document.body.appendChild(renderer.domElement)
  camera.position.z = 500
  scene.add(camera)
}

function createLight() {
  const light = new THREE.SpotLight(0xed3332, 3, 6000, 2)
  light.position.set(0, 200, 300)
  light.castShadow = true
  light.shadow.mapSize.width = 4096
  light.shadow.mapSize.height = 4096
  scene.add(light)
}

function createPlane() {
  const planeGeometry = new THREE.PlaneBufferGeometry(width, height)
  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x00dddd,
    flatShading: THREE.FlatShading
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.receiveShadow = true
  plane.position.z = 0
  plane.position.x = 0
  plane.position.y = 0
  scene.add(plane)
}

function createLines() {
  const color = new THREE.Color("yellow")
  const material = new THREE.MeshLambertMaterial({ color: color.getHex() })
  for (let i of linesPositions) {
    let boxGeometry = new THREE.BoxBufferGeometry(boxWidth, 4, 1)
    boxGeometry.translate(i.translation, 0, 0)
    let cube = new THREE.Mesh(boxGeometry, material)
    cube.position.x = i.xPos
    cube.position.y = i.yPos
    cube.position.z = 10
    cube.rotation.z = i.radians
    cube.castShadow = true
    cubesCollection.push(cube)
    scene.add(cube)
  }
}

function render() {
  requestAnimationFrame( render )
  renderer.render(scene, camera)
}

function getLinesPositions() {
  const positions = []
  const columns = 16
  const colStartingRadians = getColStartingRadians(columns)
  // full length divided by two
  const xLeftestPos =  -(columns * 2 * boxWidth + (columns - 1) * boxWidth) / 2
  let counterCol = 0
  while (counterCol < columns) {
    // baseline for this column starting x
    const columnBaseline = xLeftestPos + counterCol * 3 * boxWidth
    const colCurrentRadians = colStartingRadians[counterCol]
    const positionsForThisColumn = generatePositionsForThisColumn(columnBaseline, colCurrentRadians)
    positions.push(...positionsForThisColumn)
    counterCol++
  }
  return positions
}

function generatePositionsForThisColumn(columnBaseline, colCurrentRadians) {
  const positionsForThisColumn = []
  const rows = 6
  const units = rows * 2
  const yGap = Math.floor(height / 12)
  // box height is so small that it won't be included
  const yTopPos = 2.5 * yGap
  let counter = 0
  while (counter  < units) {
    const item = {}
    const offsetToRight = counter % 2 === 0 ? -1 : 1
    const xPos = columnBaseline + (counter % 2) * boxWidth - offsetToRight * boxWidth / 2
    const level = Math.floor(counter/2)
    const translationsDistances = (boxWidth/2) * offsetToRight
    const yPos = yTopPos - level * yGap
    item.xPos = xPos
    item.yPos = yPos
    item.radians = colCurrentRadians
    item.translation = translationsDistances
    positionsForThisColumn.push(item)
    counter++
  }
  return positionsForThisColumn
}

function getColStartingRadians(colNum) {
  //  starting at 90 degrees, each column tilt 20 degrees more
  let item = []
  for (let i = 0; i < colNum; i++) {
    let increment = i * 20 + 90
    let rad = degToRad(increment)
    // rad = 1
    item.push(rad)
  }
  return item
}

function degToRad(deg) {
  return deg * Math.PI / 180
}






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

function getTimeArray(date) {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  hours = hours < 10 ? "0" + hours : String(hours)
  minutes = minutes < 10 ? "0" + minutes : String(minutes)
  return (hours + minutes).split("")
}

function transitionToNumber () {
  // let currentNumber = [1, 2, 1, 2]
  let current = new Date()
  let currentNumber = getTimeArray(current)
  setPrevTime(current)
  let data = getDestsData(currentNumber, true, 0)
  // console.log('--after processing-')
  // console.log(data)

  animateToTarget(data)
  setCurrentDisplayData(data)
}

let tl

function animateToTarget (target) {
  // console.log(target)
  let counter = 0
  let delay = 0
  let duration = 2
  let length = cubesCollection.length - 1 // because of plus two each iteration
  tl = new TimelineMax()

  while (counter < length) {
    tl.to(cubesCollection[counter].rotation, duration, {
      directionalRotation: {
        z: -target[counter] + "_ccw",  
        useRadians: true 
      },
      ease: Power0.easeNone,
    }, delay)

    tl.to(cubesCollection[counter+1].rotation, duration, {
      directionalRotation: {
        z: -target[counter] + "_ccw",  
        useRadians: true 
      },
      ease: Power0.easeNone
    }, delay)

    if (target[counter] !== target[counter+1]){
      tl.to(cubesCollection[counter+1].rotation, duration/4, {
        z: '-=1.5708',
        ease: Power0.easeNone
      }, duration + delay)
    }
    delay += 0.04
    counter += 2
  }
}

function animatePartsTo(data, boxes) {
  // console.log('-data receiving--')
  // console.log(data)
  // console.log('--boxes--')
  // console.log(boxes)
  tl = new TimelineMax()
  let counter = 0
  let baseDelay = 0
  // let length = 96
  while (counter < 191) {
    // animate left
    let commonRot = data[counter]
    let redRot = data[counter + 1]

    if (commonRot === undefined) {
      console.log("--found you---")
      console.log(counter)
    }
    if (redRot === undefined) {
      console.log("--found you you ---")
      console.log(counter)
    }
    // console.log('--what-')
    // console.log(commonRot)
    tl.to(
      boxes[counter].rotation,
      commonRot.duration,
      {
        directionalRotation: {
          z: -commonRot.dest + "_ccw",  
          useRadians: true 
        },
        ease: Power0.easeNone
      },
      commonRot.delay + baseDelay
    )

    tl.to(
      boxes[counter + 1].rotation,
      redRot.duration,
      {
        directionalRotation: {
          z: -redRot.dest + "_ccw",  
          useRadians: true 
        },
        ease: Power0.easeNone
      },
      redRot.delay + baseDelay
    )
    counter += 2
    baseDelay += 0.02
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

function getDestsData(currentNumber, useRadians, compensateDegrees) {
  let data = getData(currentNumber)
  // console.log("--before flat--")
  // console.log(data)
  // flatten four into one
  data = flattenData(data)
  let radData = {}
  let compData = {}
  let roundedData = {}
  let counterCWData = []

  //  if compenstated by degrees
  if (compensateDegrees) {
    for (let i in data) {
      compData[i] = compensateDegreesBy(data[i], compensateDegrees)
    }
    data = compData
  }

  //  if return one converted to radians
  if (useRadians) {
    for (let i in data) {
      radData[i] = convertToRad(data[i])
    }
    data = radData
  }


  for (let i in data) {
    roundedData[i] = roundToFourDecimals(data[i])
  }
  data = roundedData

  counterCWData = data.all.map((element) => {
    return element
  })

  // console.log("--after rounded--")
  // console.log(data)

  return counterCWData
}

function roundToFourDecimals(data) {
  return data.map(element => {
    return Math.round(element * 10000) / 10000
  })
}

function flattenData(data) {
  let newArray = {
    right: [],
    left: [],
    all: []
  }
  for (let i of data) {
    newArray.right = newArray.right.concat(i.right)
    newArray.left = newArray.left.concat(i.left)
    newArray.all = newArray.all.concat(i.all)
  }
  return newArray
}

function compensateDegreesBy(data, deg) {
  return data.map(element => {
    return element + deg
  })
}

function convertToRad(data) {
  return data.map(element => {
    return degToRad(element)
  })
}


function iniRotations() {
  let tl = new TimelineMax()
  for (let i of cubesCollection) {
    tl.to(i.rotation, 2, {
      // the actual z will always be from 0 -> -6.28
      z: "-=6.28319",
      ease: Power0.easeNone,
      repeat: -1
    }, 0)
  }
  // tl.to(cube.rotation, 4, {
  //   z: "-=6.28",
  //   ease: Power0.easeNone,
  //   repeat: -1
  // }, 0)

  // tl.to(cube.rotation, 4, {
  //   z: "-=3.14",
  // }, 4)
}
