import './style.css'

// Import Three.js library
import * as THREE from 'three';

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
const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true });

// Mesh is what we want to add to scene
const torus = new THREE.Mesh(geometry, material);

// Add Mesh 
scene.add(torus);

// To see it need to rerender screen
// Can use renderer.render( scene, camera ) to render, but dont want to have to call it constantly

function animate() {
  requestAnimationFrame(animate);

  // Change properties, in loop will animate
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();