import * as THREE from "three"

import {
  updateBoxesCollection
} from './store.js'

import {
  getColStartingRadians
} from './utils.js'

const width = window.innerWidth;
const height = window.innerHeight;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(70, width / height, 0.001, 1500);
const boxWidth = Math.floor(width / 70)
const yGap = Math.floor(height / 12)
const rows = 6
const columns = 16
const boxesPositions = getBoxesPositionsAlt(boxWidth, yGap, rows, columns)


// unit checked
function prepareBoard() {
  createScene();
  createLight();
  createPlane();
  const boxesCollection = createBoxes();
  updateBoxesCollection(boxesCollection);
  render();
}

// unit checked
function createScene() {
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0xffffff, 1);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 500;
  scene.add(camera);
}

// unit checked
function createLight() {
  const light = new THREE.SpotLight(0xed3332, 3, 6000, 2);
  light.position.set(0, 200, 300);
  light.castShadow = true;
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  scene.add(light);
}

// unit checked
function createPlane() {
  const planeGeometry = new THREE.PlaneBufferGeometry(width, height);
  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x00dddd,
    flatShading: THREE.FlatShading
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.position.z = 0;
  plane.position.x = 0;
  plane.position.y = 0;
  scene.add(plane);
}

// unit checked
function createBoxes() {
  const boxesCollection = []
  const color = new THREE.Color("yellow");
  const material = new THREE.MeshLambertMaterial({
    color: color.getHex()
    // transparent: true,
    // opacity: 0.2
  });
  for (const i of boxesPositions) {
    const boxGeometry = new THREE.BoxBufferGeometry(boxWidth, 4, 1);
    boxGeometry.translate(i.translation, 0, 0);
    const cube = new THREE.Mesh(boxGeometry, material);
    cube.position.x = i.xPos;
    cube.position.y = i.yPos;
    cube.position.z = 10;
    cube.rotation.z = i.radians;
    cube.castShadow = true;
    boxesCollection.push(cube);
    scene.add(cube);
  }
  return boxesCollection
}

// unit wise. impossible to understand
function getBoxesPositionsAlt(boxWidth, yGap, rows, columns) {
  const positions = []
  const colStartingRadians = getColStartingRadians(columns)
  const unitsPerColumns = rows * 2
  const totalUnits = columns * unitsPerColumns
  const xLeftestPos = -(columns * 2 * boxWidth + (columns - 1) * boxWidth) / 2 + 1 / 2 * boxWidth
  const yTopPos = ((rows - 1) / 2) * yGap
  let counter = 0
  while (counter < totalUnits) {
    const columnNumber = Math.floor(counter / unitsPerColumns)
    const unitNumberInCurrentColumn = counter % unitsPerColumns
    const dividend = unitNumberInCurrentColumn % 2
    const rowNumber = Math.floor(unitNumberInCurrentColumn / 2)
    const currentColumnRadians = colStartingRadians[columnNumber]
    const offsetToRight = dividend === 0 ? -1 : 1
    const translationsDistances = boxWidth / 2
    const translationsVector = translationsDistances * offsetToRight
    const xPos = xLeftestPos + dividend * boxWidth + columnNumber * 3 * boxWidth - translationsVector
    const yPos = yTopPos - rowNumber * yGap;
    positions.push({
      xPos,
      yPos,
      translation: translationsVector,
      radians: currentColumnRadians
    })
    counter++
  }
  return positions
}

// unit checked
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}


export {
  prepareBoard
}
