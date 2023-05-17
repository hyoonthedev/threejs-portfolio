import './style.css'

// Import Three.js library
import * as THREE from 'three';

// Makes scene more interactive, more around scene with mouse
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Always need three objects
// 1. Scene 2. Camera 3. Renderer 

// Scene is like container, holds all objects camera and lights 
const scene = new THREE.Scene();

// Different Cameras, Perspective mimics what human eyes can see (Aspect Ratio, Field of View, View Fustrum (What is visible relative to camera))
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Render graphis to scene
// Needs to know what DOM element to use
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// Set pixel ratio, and size
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Camera moved along Z Axis
camera.position.setZ(30);

renderer.render(scene, camera);

// Add Object

// Object need vector that define object
// Torus is 3D Ring
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// Material for texture and colour (Wrapping Paper)
// Most need light source, Basic will not require it
// Parameters such as color and wireframe
// When changing to StandardMaterial from BasicMaterial, it will go black due to no lighting
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 });

// Mesh is what we want to add to scene
const torus = new THREE.Mesh(geometry, material);

// Add Mesh 
scene.add(torus);

// Lighting
// Different lights, PointLight adds light in all directions as a lightbulb would
// AmbientLight will light up entire scene
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);

// Set light position
pointLight.position.set(20,20,20)

// Add to scene
scene.add(pointLight, ambientLight)

// Helpers
// Will show Light Source position as a wireframe
const lightHelper = new THREE.PointLightHelper(pointLight)
// Perspective as a grid
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

// Call OrbitControls, pass in camera and domElement(Listen for dom events on mouse and update camera position accordingly)
const controls = new OrbitControls(camera, renderer.domElement);

// Add Stars
function addStar() {
  // Star will be a sphere
  const geometry = new THREE.SphereGeometry(0.25,4,4);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  // Join them together
  const star = new THREE.Mesh(geometry, material);

  // Randomly generate x, y and z position
  // Fill Array with 3 values (Array(3).fill()), map to randFloatSpred which generates number ranomdly from negative to positive value 
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  // Take random number and set to position of star
  star.position.set(x, y, z)

  // Add star to scene
  scene.add(star)
}

// Add any amount of stars
Array(200).fill().forEach(addStar)
// To see it need to rerender screen
// Can use renderer.render( scene, camera ) to render, but dont want to have to call it constantly

function animate() {
  requestAnimationFrame(animate);

  // Change properties, in loop will animate
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // OrbitalControl, to update changes in UI
  controls.update();

  renderer.render(scene, camera);
}

animate();