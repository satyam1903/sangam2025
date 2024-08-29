/**
* Template Name: TheEvent
* Template URL: https://bootstrapmade.com/theevent-conference-event-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

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
    "https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?cs=srgb&dl=pexels-enginakyurt-1435752.jpg&fm=jpg&w=1920&h=1281"
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

let countdownTicRef = null;

// Set the deadline date to 11 January 2025
const deadlineDate = new Date("2025-01-11T00:00:00Z").toISOString();

function getTimeRemaining(date) {
  const time = Date.parse(date) - new Date().getTime(),
    days = Math.floor(time / 1000 / 60 / 60 / 24),
    hours = Math.floor((time / 1000 / 60 / 60) % 24),
    minutes = Math.floor((time / 1000 / 60) % 60),
    seconds = Math.floor((time / 1000) % 60);

  return {
    time,
    days,
    hours,
    minutes,
    seconds,
  };
}

function getZero(num) {
  return num >= 0 && num < 10 ? "0" + num : num + "";
}

function updateTimer() {
  const time = getTimeRemaining(deadlineDate);
  document.getElementById("days").textContent = getZero(time.days);
  document.getElementById("hours").textContent = getZero(time.hours);
  document.getElementById("minutes").textContent = getZero(time.minutes);
  document.getElementById("seconds").textContent = getZero(time.seconds);
}

function startCountdown() {
  countdownTicRef = setInterval(updateTimer, 1000);
}

startCountdown();
