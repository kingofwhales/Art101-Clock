import * as THREE from "three"
import {TimelineMax} from 'gsap'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

let scene, renderer, camera, cube, cube2

setUp()


function setUp() {
  createScene()
  createLight ()
  createPlane ()
  createLines ()
  iniRotations ()
  render()
}

function createScene() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0xffffff, 1);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.001, 1500);
  camera.position.z =500;
  scene.add(camera);
}

function createLight () {
  let light = new THREE.SpotLight(0xed3332, 3, 6000, 2);
  light.position.set(0, 0, 300);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  scene.add(light);
}

function createPlane () {
  let planeGeometry = new THREE.PlaneBufferGeometry(WIDTH, HEIGHT);
  let planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x00dddd,
    specular: 0x009900,
    shininess: 10,
    flatShading: THREE.FlatShading
  });
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.position.z = 0;
  plane.position.x = 0;
  plane.position.y = 0;
  scene.add(plane);  
}

function createLines () {
  let boxWidth = WIDTH / 70;
  let boxGeometry = new THREE.BoxBufferGeometry(boxWidth, 4, 2);
  let color = new THREE.Color("yellow");
  let material = new THREE.MeshLambertMaterial({ color: color.getHex() });


  // each column has 12 lines, 6 rows, 2 lines on each row, left and right
  // the whole block has 16 columns, repeat
  // condition 1: whether left or right based on divident
  // condition 2: which row based on divided by 2
  // draw each column first because of the animation order
  // each column has a baseline x pos. increment line width to get respective coordinates
  let counterRow = 0
  let counterCol = 0
  let xBaseline = 0
  let yBaseline = 0

  // to be decided
  let yGap = HEIGHT / 12
  let xGap = boxWidth

  while (counterCol < 16) {
    counterRow = 0
    let drawRightFirst = counterCol < 8 ? true : false
    while (counterRow < 12) {
      let cube = new THREE.Mesh(boxGeometry, material);
      let divident = counterRow % 2;
      let rowNumber = Math.floor(counterRow / 2);
      let colNumber = counterCol
      let xPos, yPos

      //  it's spanning out from the center line xpos 0
      if (drawRightFirst) {
        xPos = divident === 0 ? xBaseline : xBaseline + boxWidth;
        xPos -= 3 * boxWidth * (7.5 - colNumber);

      } else {
        xPos = divident === 0 ? xBaseline + boxWidth : xBaseline
        xPos += 3 * boxWidth * (colNumber - 7.5);
      }

      if (counterRow < 6) {
        yPos = yBaseline + (2.5 - rowNumber) * yGap
      } else {
        yPos = yBaseline - (rowNumber - 2.5) * yGap;
      }
      cube.position.x = xPos;
      cube.position.y = yPos;
      cube.position.z = 10;
      cube.castShadow = true;
      scene.add(cube);
      counterRow++;
    }
    counterCol++
  }

  // cube = new THREE.Mesh(boxGeometry, material);
  // cube2 = new THREE.Mesh(boxGeometry, material);
  // cube.position.x = -300;
  // cube.position.y = 180;
  // cube.position.z = 10;

  // cube2.position.x = -280;
  // cube2.position.y = 180;
  // cube2.position.z = 10;
  // cube.castShadow = true;
  // cube2.castShadow = true;
  // scene.add(cube);
  // scene.add(cube2);
}

function iniRotations() {
  let tl = new TimelineMax();
  // tl.to(cube.rotation, 4, {
  //   z: "-=6.28",
  //   ease: Power0.easeNone,
  //   repeat: -1
  // }, 0);

  // tl.to(cube.rotation, 4, {
  //   z: "-=3.14",
  // }, 4);
}

function render() {
  requestAnimationFrame( render );
  renderer.render(scene, camera);
};
