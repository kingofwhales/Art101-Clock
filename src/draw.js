import * as THREE from "three"

import {
  updateBoxesCollection
} from './store.js'

import {
  getBoxesPositions,
  getBoxesPositionsAlt
} from './notSure.js'

// ????????unsure section
// ????????unsure section
// ????????unsure section
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
function setUp() {
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

// unit checked
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}


export {
  setUp
}
