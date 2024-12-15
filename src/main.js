import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js"

const canvas = document.getElementById('canvas');

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//object 

const wireGeometry = new THREE.SphereGeometry( 5, 5, 5 );

const wireframe = new THREE.WireframeGeometry( wireGeometry );
const wireMaterial = new THREE.LineBasicMaterial({
  color: 0x468585,   // Set color (you can use any hexadecimal color or a string)
  linewidth: 2,      // Set the width of the lines (note: not all browsers/platforms support this)
  opacity: 0.25,     // Set opacity for transparency
  transparent: true, // Enable transparency
  depthTest: false,
});


const line = new THREE.LineSegments( wireframe, wireMaterial );
// line.material.depthTest = false;
// line.material.opacity = 0.5;
// line.material.transparent = true;


const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585'});
const dodecahedron = new THREE.Mesh(geometry, material);


const boxGeometry = new THREE.BoxGeometry(2,0.1,2);
const boxMaterial = new THREE.MeshLambertMaterial({ color: '#B4B4B3', emissive: '#B4B4B3'});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = -1.5;

scene.add( line );
scene.add(dodecahedron);
scene.add(box);

//light
const light = new THREE.SpotLight(0x006769, 100);
light.position.set(1,1,1);
scene.add(light);

//renderer
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);



//add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom= true;
controls.enablePan = true;


// add animations

function animate(){
  requestAnimationFrame(animate);
  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.01;

  box.rotation.y += 0.005;

  controls.update();
  renderer.render(scene, camera);
} ;
animate();

