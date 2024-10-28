const visualContainer = document.getElementById("visual-container");

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
visualContainer.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.set(0, 0, 1000);
scene.add(camera);

// Luce principale
const light = new THREE.PointLight(0x0066cc, 10.5, 2000);
light.position.set(900, 400, 100);
scene.add(light);

const textureLoader = new THREE.TextureLoader();

// Carica le texture per i cubi
const textures = [
  textureLoader.load(
    "https://www.superoffice.com/globalassets/blog/2018/8/sales-process-template.jpg?v=4998cd"
  ), // Sostituisci con il percorso della tua texture
];

const boxGeometries = [
  new THREE.BoxGeometry(30, 10, 60),
  new THREE.BoxGeometry(50, 20, 10),
  new THREE.BoxGeometry(10, 40, 20),
  new THREE.BoxGeometry(6, 4, 10),
];

const boxMaterials = textures.map(
  (texture) =>
    new THREE.MeshStandardMaterial({
      map: texture,
      bumpMap: texture,
      bumpScale: 0.6,
      roughness: 0.8,
      metalness: 0.8,
      side: THREE.DoubleSide,
    })
);

const meshGroup = new THREE.Group();
for (let i = 0; i < 1200; i++) {
  const geometry =
    boxGeometries[Math.floor(Math.random() * boxGeometries.length)];
  const material =
    boxMaterials[Math.floor(Math.random() * boxMaterials.length)];
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(
    Math.random() * 2000 - 1000,
    Math.random() * 2000 - 1000,
    Math.random() * 2000 - 1000
  );
  mesh.rotation.set(
    Math.random() * 2 * Math.PI,
    Math.random() * 2 * Math.PI,
    0
  );
  const scale = Math.random() * 2;
  mesh.scale.set(scale, scale, scale);
  mesh.updateMatrix();
  meshGroup.add(mesh);
}
scene.add(meshGroup);

let time = 0;
const lightRadius = 500;
const lightCenter = new THREE.Vector3(0, 400, 1000);

let mouseX = 0;
let mouseY = 0;

//   Event listener per il movimento del mouse
document.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX / window.innerWidth) * 6 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 6 + 1;
});

// Event listener per lo slider
// slider.addEventListener("input", (event) => {
//   const newValue = parseInt(event.target.value);
//   sliderLabel.textContent = newValue;

//   // Aggiungi o rimuovi cubi a seconda del valore dello slider
//   adjustNumberOfMeshes(newValue);
// });

function adjustNumberOfMeshes(newNumElements) {
  const diff = newNumElements - currentNumElements;

  if (diff > 0) {
    // Aggiungi cubi se il nuovo numero è maggiore
    for (let i = 0; i < diff; i++) {
      addCube();
    }
  } else if (diff < 0) {
    // Rimuovi cubi se il nuovo numero è minore
    for (let i = 0; i < -diff; i++) {
      removeCube();
    }
  }
  currentNumElements = newNumElements;
}

function addCube() {
  const geometry =
    boxGeometries[Math.floor(Math.random() * boxGeometries.length)];
  const material =
    boxMaterials[Math.floor(Math.random() * boxMaterials.length)];
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(
    Math.random() * 2000 - 1000,
    Math.random() * 2000 - 1000,
    Math.random() * 2000 - 1000
  );
  mesh.rotation.set(
    Math.random() * 2 * Math.PI,
    Math.random() * 2 * Math.PI,
    0
  );
  const scale = Math.random() * 2;
  mesh.scale.set(scale, scale, scale);
  mesh.updateMatrix();
  meshGroup.add(mesh);
}

function removeCube() {
  const lastMesh = meshGroup.children[meshGroup.children.length - 1];
  if (lastMesh) {
    meshGroup.remove(lastMesh);
  }
}

function animate() {
  requestAnimationFrame(animate);

  // Movimento graduale della luce in un percorso circolare attorno al centro
  light.position.x = lightCenter.x + lightRadius * Math.cos(time * 0.6);
  light.position.z = lightCenter.z + lightRadius * Math.sin(time * 0.6);
  light.position.y = lightCenter.y + 100 * Math.sin(time * 0.3);

  // Transizione graduale del colore della luce
  const color = new THREE.Color(0.12624335671860842, 0.09999999999999998, 0.9);
  //console.log("Color ", new Date().toLocaleTimeString(), color);
  color.setHSL(0.9990638198869073, 0.8, 0.5);
  const data = {
    r: 0.899999999999999,
    g: 0.10066148127747805,
    b: 0.10000000000000012,
  };
  const lerp = {
    r: 0.899999999999999,
    g: 0.10000000000000012,
    b: 0.10056403170581825,
  };

  // console.log(
  //   "Color shl ",
  //   new Date().toLocaleTimeString(),
  //   Math.sin(time * 0.2) * 0.5 + 0.5,
  //   0.8,
  //   0.5
  // );
  light.color.lerp(color, 0.05);
  // console.log(
  //   "lerp value",
  //   new Date().toLocaleTimeString(),
  //   light.color.lerp(color, 0.05)
  // );

  // Assicurati che l'intensità della luce non scenda mai sotto un valore minimo più alto
  light.intensity = Math.max(Math.abs(Math.sin(time * 0.5)) * 10.5, 5);

  // Aggiorna la rotazione del gruppo di mesh in base alla posizione del mouse
  meshGroup.rotation.x += 0.0005 + mouseY * 0.001;
  meshGroup.rotation.y += 0.0002 + mouseX * 0.001;

  // Animazione oscillante dei cubi
  meshGroup.children.forEach((mesh, index) => {
    mesh.position.y += Math.sin(time + index) * 0.5;
  });

  renderer.render(scene, camera);

  time += 0.01;
}

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

window.addEventListener("resize", onWindowResize);
onWindowResize();

animate();
