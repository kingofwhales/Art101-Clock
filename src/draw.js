import * as THREE from "three"

import {
  updateCubesCollection
} from './store.js'

import {
  getLinesPositions
} from './notSure.js'

const width = window.innerWidth;
const height = window.innerHeight;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(70, width / height, 0.001, 1500);
const cubesCollection = [];
const boxWidth = Math.floor(width / 70)
const columns = 16
const linesPositions = getLinesPositions(boxWidth, columns) //6 rows, 16 columns

function setUp() {
  createScene();
  createLight();
  createPlane();
  createLines();
  render();
  updateCubesCollection(cubesCollection);
}

function createScene() {
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0xffffff, 1);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 500;
  scene.add(camera);
}

function createLight() {
  const light = new THREE.SpotLight(0xed3332, 3, 6000, 2);
  light.position.set(0, 200, 300);
  light.castShadow = true;
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  scene.add(light);
}

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

function createLines() {
  const color = new THREE.Color("yellow");
  const material = new THREE.MeshLambertMaterial({
    color: color.getHex()
    // transparent: true,
    // opacity: 0.2
  });
  for (let i of linesPositions) {
    let boxGeometry = new THREE.BoxBufferGeometry(boxWidth, 4, 1);
    boxGeometry.translate(i.translation, 0, 0);
    let cube = new THREE.Mesh(boxGeometry, material);
    cube.position.x = i.xPos;
    cube.position.y = i.yPos;
    cube.position.z = 10;
    cube.rotation.z = i.radians;
    cube.castShadow = true;
    cubesCollection.push(cube);
    scene.add(cube);
  }
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}


export {
  setUp
}
