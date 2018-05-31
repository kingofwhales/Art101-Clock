import * as THREE from "three";
import { TimelineMax } from "gsap";

const width = window.innerWidth;
const height = window.innerHeight;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(70, width / height, 0.001, 1500);

const gridNumber = 7 // has to be 7
const gapNumber = gridNumber - 1
const distanceToEnd = gapNumber / 2
const layerCount = Math.floor(gridNumber / 2 )
// const isCenterLayerSingleUnit = gridNumber % 2 === 1 ? true : false
const topLeftPos = {x: -distanceToEnd, y: distanceToEnd}

const radius = 40
const gap = 10
console.log('-layer count-')
console.log(layerCount)
const baseCoordinates = getBaseCoordinates()
const outestLayerCoordinates = [
  { x: -4, y: 1 },
  { x: -4, y: 0 },
  { x: -4, y: -1 },

  { x: 4, y: 1 },
  { x: 4, y: 0 },
  { x: 4, y: -1 },

  { x: -1, y: 4 },
  { x: 0, y: 4 },
  { x: 1, y: 4 },

  { x: -1, y: -4 },
  { x: 0, y: -4 },
  { x: 1, y: -4 }
];

const outestPos = getBoxesPositions(outestLayerCoordinates)
const basePos = getBoxesPositions(baseCoordinates)
const positions = {
  outestPos,
  basePos,
  allPos: outestPos.concat(basePos)
}

// from in to out
const layerCollection = [
  [],
  [],
  [],
  [],
  []
]

const boxesCollection = []

const targetCollection = {
  target: [],
  rest: []
}

function prepareBoard() {
  // console.log('-scene 2 setting up-')
  createScene()
  createLight();
  createPlane();
  createCylinder()
  // createNotches()
  createBoxes(positions.allPos)
  extractLayers(boxesCollection)
  extractNumberAndRest(boxesCollection)
  render();
  // animateTest(targetCollection.target)
}

//target collection.  rest and target passed.
// layers collection. five layers passed
function animateTest (collections) {
  const tl = new TimelineMax()
  // const test = collections.slice(36,48)
  collections.forEach((element) => {
    tl.to(element.rotation, 4, {
      z: "-=6.2832",
      ease: Power0.easeNone,
      repeat: -1
    }, 0)
  })
  return tl
}
// console.log('-final-')
// console.log(outestPos)
// console.log(basePos)
//we have gotten all coordinates
// now it's time to get positions
// now we have the positions
// we need to either
// draw?
// or extract first?
// let's draw to make sure positions are right first

// createBoxes(basePos)

function createBoxes (positions) {
  console.log('-in creating-')
  console.log(positions)
  positions.forEach((element, index) => {
    // console.log('-ha')
    const boxGeometryLeft = new THREE.BoxBufferGeometry(radius / 2, 4, 1);
    const colorLeft = new THREE.Color("white");
    const materialLeft = new THREE.MeshStandardMaterial({
      color: colorLeft.getHex()
    });
    const cubeLeft = new THREE.Mesh(boxGeometryLeft, materialLeft);
    boxGeometryLeft.translate(-radius / 4, 0, 0)
    cubeLeft.position.x = element.x
    cubeLeft.position.y = element.y
    cubeLeft.position.z = 20
    // cubeLeft.rotation.z = 1.5719
    scene.add(cubeLeft)

    const boxGeometryRight = new THREE.BoxBufferGeometry(radius / 2, 4, 1);
    const colorRight = new THREE.Color("red");
    const materialRight = new THREE.MeshStandardMaterial({
      color: colorRight.getHex()
    });
    const cubeRight = new THREE.Mesh(boxGeometryRight, materialRight);
    boxGeometryRight.translate(radius / 4, 0, 0)
    cubeRight.position.x = element.x
    cubeRight.position.y = element.y
    cubeRight.position.z = 20
    // cubeRight.rotation.z = 1.5719
    scene.add(cubeRight)
    boxesCollection.push(cubeLeft, cubeRight)
  })
  console.log(boxesCollection)
}


function extractLayers (collection) {
  layerCollection.forEach((item, counter, array) => {
    collection.forEach((element, index, array) => {
      const distance = counter * (radius + gap)
      const xDis = Math.abs(element.position.x)
      const yDis = Math.abs(element.position.y)
      const oneEqual = xDis === distance || yDis === distance
      const withinBound = xDis <= distance && yDis <= distance
      if (oneEqual && withinBound) {
        item.push(element)
      }
    })
  })
  console.log('-layered collection-')
  console.log(layerCollection)
}

// -200: -50 - 50   
//  -150: -50 50
// -100
// -50

function extractNumberAndRest (collection) {
  const dupCollection = []
  let counterX = -200
  while (counterX <= 200) {
    let counterY = 50
    while (counterY >= -50) {
      collection.forEach((element, index, array) => {
        const xPos = element.position.x
        const yPos = element.position.y
        const isCenterColumn = xPos === 0
        if (xPos === counterX && yPos === counterY && !isCenterColumn ) {
          targetCollection.target.push(element)
          element.isTarget = true
        }
      })
      counterY -= 50
    }
    counterX += 50
  }
  // console.log(collection)

  targetCollection.rest = collection.filter((element) => {
    return !element.isTarget
  })
  // console.log('-target-')
  // console.log(targetCollection)
  // return targetCollection
}

function getBaseCoordinates () {
  const coordinates = []
  for (let i = 0; i < gridNumber; i++) {
    const x = topLeftPos.x + i
    for (let j = 0; j < gridNumber; j++) {
      const y = topLeftPos.y - j
      coordinates.push({x: x, y: y})
    }
  }
  console.log(coordinates)
  return coordinates
}


function getBoxesPositions (data) {
  return data.map((element, index, array) => {
    const x = element.x
    const y = element.y
    // console.log('-x')
    // console.log(x)
    const xPos = x * (radius + gap)
    const yPos = y * (radius + gap)
    // console.log(radius + gap)
    return {
      x: xPos,
      y: yPos
    }
  })
}


function createNotches () {
  const geometry = new THREE.CylinderBufferGeometry(100, 100, 20, 100, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0x000000 });
  const notch = new THREE.Mesh(geometry, material);
  notch.position.z = 0
  notch.rotation.x = Math.PI / 2
  scene.add(notch);
}

function createScene () {
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0xffffff, 1);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 500;
  scene.add(camera);
}

// unit checked
function createLight () {
  const light = new THREE.SpotLight(0xffffff, 2, 6000, 2);
  light.position.set(100, 200, 300);
  light.castShadow = true;
  light.shadow.mapSize.width = 10000;
  light.shadow.mapSize.height = 10000;
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0x404040,1); // soft white light
  scene.add(ambientLight);
}

function createCylinder () {
  const geometry = new THREE.CylinderBufferGeometry(300, 300, 20, 100);
  const material = new THREE.MeshPhongMaterial({ color: 0x000000 });
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.castShadow = true;
  cylinder.rotation.x = Math.PI / 2
  scene.add(cylinder);
}
// unit checked
function createPlane () {
  const planeGeometry = new THREE.PlaneBufferGeometry(width, height);
  const planeMaterial = new THREE.MeshLambertMaterial();
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.position.z = 0;
  plane.position.x = 0;
  plane.position.y = 0;
  scene.add(plane);

  // is it a curved surface my lord?
}


// unit checked
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

export {
  prepareBoard
}
