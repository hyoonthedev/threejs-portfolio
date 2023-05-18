import './style.css'

// Import Three.js library
import * as THREE from 'three';

// Makes scene more interactive, more around scene with mouse
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Always need three objects
// 1. Scene 2. Camera 3. Renderer 

// Scene is like container, holds all objects camera and lights 
const scene = new THREE.Scene();

// Different Cameras, Perspective mimics what human eyes can see (Aspect Ratio, Field of View, View Frustrum (What is visible relative to camera))
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
const material = new THREE.MeshStandardMaterial( { color: 0x5F9EA0 });

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
// scene.add(lightHelper, gridHelper)

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
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  // Take random number and set to position of star
  star.position.set(x, y, z);

  // Add star to scene
  scene.add(star);
}

// Add any amount of stars
Array(200).fill().forEach(addStar);

// Add Background
// Load Image
const spaceTexture = new THREE.TextureLoader().load('space.png');

// Add texture to background
scene.background = spaceTexture;

// Avatar Box
// Load Texture
const avatarTexture = new THREE.TextureLoader().load('avatar.jpg');

// Create Mesh
const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: avatarTexture })
)

// Add Avatar Box to Scene
scene.add(avatar);

// Planet
// Load Texture
const planetTexture = new THREE.TextureLoader().load('planet.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

// Create Mesh
const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ 
    map: planetTexture,

    // Add some normal depth, lets light bounce of it
    normalMap: normalTexture,
  })
)

// Add Planet to Scene
scene.add(planet);

// Reposition Planet
// Both ways will work, up to preference
planet.position.z = 30;
planet.position.setX(-10);

// Camera Move

function moveCamera() {

  // Calculate where user is scrolled to
  // Will give dimensions of viewport, top property will show how far from top of the page
  const t = document.body.getBoundingClientRect().top;

  // Rotate planet whenever function is called
  planet.rotation.x += 0.05;
  planet.rotation.y += 0.075;
  planet.rotation.z += 0.05;

  // Rotate avatar whenever function is called
  avatar.rotation.y += 0.01;
  avatar.rotation.z += 0.01;

  // Change position of camera
  // t will always be negative number, so multiple with another negative number
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

// Will use function everytime user scrolls
document.body.onscroll = moveCamera;

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