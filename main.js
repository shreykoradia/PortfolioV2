import './style.css'
import * as THREE from 'three'


// setting up the scene 
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1b1b1b)
// scene.background = new THREE.Color(0xECD0BE) 

// setting up the scene 
const camera = new THREE.PerspectiveCamera(45 , window.innerWidth/window.innerHeight , 0.5 , 1000 );
camera.position.setZ(20);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#main-content")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth , window.innerHeight);


// adding pointlight

const pointLight = new THREE.PointLight(0xbf40BF);
pointLight.position.set(5,-28.5,5);
const pointLight2 = new THREE.PointLight(0x00ffff);
pointLight2.position.set(5,5,5);

scene.add(pointLight , pointLight2);



//adding the shapes 


const crystalGeometry = new THREE.OctahedronGeometry(1, 0);
// const whiteBasicMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
const shinyMaterial = new THREE.MeshStandardMaterial({
  color : 0xffffff,
  metalness: 0.1,
  roughness:0.2,
  shininess:0.9,
  transparent:true,
  opacity:0.7,
});

const crystal = new THREE.Mesh(crystalGeometry , shinyMaterial);

// adding to the scene 
scene.add(crystal);
crystal.position.set(6, 4, 3);

const crystal2 = crystal.clone();
crystal2.position.set(-6, -4, 2);
scene.add( crystal2 );

const createMeshWithRandomPosition = (geometry, material) => {
  const mesh = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(170));
  // console.log(x, y, z);
  mesh.position.set(x, y, z);

  scene.add(mesh);
}

const createMeshWithRandomPositionAndRotation = (geometry, material) => {
  const mesh = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  mesh.position.set(x, y, z);

  const [rx, ry, rz] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(1));
  mesh.rotation.set(x, y, z);

  scene.add(mesh);
}

// Array(50).fill().map(() => createMeshWithRandomPosition(new THREE.SphereGeometry(0.3, 20, 20), whiteMaterial));
// Array(50).fill().map(() => createMeshWithRandomPosition(crystalGeometry, whiteMaterial));
Array(50).fill().map(() => createMeshWithRandomPositionAndRotation(new THREE.TorusGeometry( 2, 1, 16, 100 ), shinyMaterial));



// adding sphere with textures 

const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('./photo-1535376472810-5d229c65da09.avif');
const texturedMaterial = new THREE.MeshStandardMaterial( {
  color: 0xffffff,
  metalness: 0.7,
  roughness: 0.2,
  normalMap: normalTexture,
  // emissive: 0x9152cc,
  emissive: 0xb7b0be,
} );
const bigSphereGeometry = new THREE.SphereGeometry(4, 64, 64);
const bigSphere = new THREE.Mesh( bigSphereGeometry, texturedMaterial );
scene.add( bigSphere );



const animatedMeshes = [crystal, crystal2, bigSphere];

function animate() {
	requestAnimationFrame( animate );
  // Insert animation step transformations here
  // // Such as:
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  animatedMeshes.map(mesh => mesh.rotation.y += 0.005)
  //adding the scene with renderer
	renderer.render( scene, camera );
}
animate();

const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * 0.008 + 20;
  camera.position.y = t * 0.008;
  camera.rotation.x = t * 0.00095;
}

document.body.onscroll = moveCamera;
