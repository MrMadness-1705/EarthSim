import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.157.0/examples/jsm/controls/OrbitControls.js';

// Create WebGL renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Create scene
const scene = new THREE.Scene();

// create a 360 degree background domb 
// Load background image for 360-degree panorama
// Double sided texture on the box
const boxTexture = new THREE.TextureLoader().load(
  'resources/BG_Space.jpg',

);
const boxMaterial = new THREE.MeshBasicMaterial({ map: boxTexture, side: THREE.DoubleSide });
const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);


// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Load Earth texture
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('resources/Earth_BG.jpg');

// Create Earth mesh with texture
const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

// Create a new Moon object
const moonTexture = new THREE.TextureLoader().load('resources/Moon_BG.jpg');
const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.8, 32, 32), // Increased the size of the moon
  moonMaterial
);
moon.position.set(3, 3, 3);
scene.add(moon);

var moonOrbitRadius = 10;
var moonOrbitSpeed = 0.006;
var moonOrbitAngle = 15;

function animateMoonOrbit() {
  moonOrbitAngle += moonOrbitSpeed;
  var x = moonOrbitRadius * Math.cos(moonOrbitAngle);
  var z = moonOrbitRadius * Math.sin(moonOrbitAngle);
  moon.position.set(x, 0, z);
}

//Create a Christmas Tree
// Create tree trunk
const trunkGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 8);  // Shrunk the size of the trunk
const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk.position.y = 2.45;
scene.add(trunk);

//Create Tree Leafs
const branchGeometry = new THREE.ConeGeometry(0.5, 1.5, 8);  // Adjusted size of the branches
const branchMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
const branch1 = new THREE.Mesh(branchGeometry, branchMaterial);
branch1.position.set(0, 3.5, 0);  // Adjusted position of the branches
scene.add(branch1);

const branch2 = new THREE.Mesh(branchGeometry, branchMaterial);
branch2.position.set(0, 3, 0);  // Adjusted position of the branches
scene.add(branch2);

// Create a star 
// Create a star shape
const starGeometry = new THREE.IcosahedronGeometry(0.5, 5);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const star = new THREE.Mesh(starGeometry, starMaterial);
star.position.set(0, 4.5, 0);  // Set position above the tree
scene.add(star);

// Play background music
const audioLoader = new THREE.AudioLoader();
const listener = new THREE.AudioListener();

camera.add(listener);
const backgroundMusic = new THREE.PositionalAudio(listener);
audioLoader.load('resources/BGsound.mp3', function(buffer) {

  backgroundMusic.setBuffer(buffer);
  backgroundMusic.setLoop(true);
  backgroundMusic.setVolume(0.5);
  backgroundMusic.setRefDistance(20);
  backgroundMusic.play();
});

// Create button to play or pause music
const playPauseButton = document.createElement('button');
playPauseButton.textContent = 'Play/Pause Music';
let musicPlaying = true;
playPauseButton.addEventListener('click', () => {
  if (musicPlaying) {
    backgroundMusic.pause();
    musicPlaying = false;
  } else {
    backgroundMusic.play();
    musicPlaying = true;
  }
});
document.body.appendChild(playPauseButton);

// Load background image for 360-degree panorama
// Double sided texture on the box



// Create orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Add responsive behavior
window.addEventListener('resize', function() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Add 3D  particles
const particleGeometry = new THREE.SphereGeometry(0.1, 32, 32);  // Increase the size of particles
const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const particleMesh = new THREE.Mesh(particleGeometry, particleMaterial);

for (let i = 0; i < 1000; i++) {  // Increase the number of particles to 1000
  const particle = particleMesh.clone();
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(99)); // Increase spread range to 99
  particle.position.set(x, y, z);
  scene.add(particle);

}



// Create buttons for controlling Earth's rotation
const rotateLeftButton = document.createElement('button');
rotateLeftButton.textContent = 'Rotate Left';
rotateLeftButton.addEventListener('click', () => {
  earthMesh.rotation.y += 0.5;
});

const rotateRightButton = document.createElement('button');
rotateRightButton.textContent = 'Rotate Right';
rotateRightButton.addEventListener('click', () => {
  earthMesh.rotation.y -= 0.5;
});

// Append buttons to the document body
document.body.appendChild(rotateLeftButton);
document.body.appendChild(rotateRightButton);

// Create orbital controls toggle button
const toggleOrbitControlsButton = document.createElement('button');
toggleOrbitControlsButton.textContent = 'Toggle Orbit Controls';
toggleOrbitControlsButton.addEventListener('click', () => {
  controls.enabled = !controls.enabled;
});

// Append button to the document body
document.body.appendChild(toggleOrbitControlsButton);


// Render function
function animate() {
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.001;
  animateMoonOrbit();
  controls.update();
  renderer.render(scene, camera);
}
animate();

/*
Resize Window
*/
function onWindowResize() {
  console.log("changed");
  //camera.aspect = window.innerWidth / window.innerHeight;
  //camera.updateProjectionMatrix();
  //renderer.setSize(window.innerWidth, Window.innderHeight);
  // set the aspect ratio to match the new browser window aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);