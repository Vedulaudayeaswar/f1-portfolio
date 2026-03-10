import * as THREE from "three";
import { SoundManager } from "./sounds.js";

// ===== LOADING SCREEN =====
const loadingScreen = document.getElementById("loading-screen");
const progressFill = document.getElementById("progress-fill");
const loadingText = document.getElementById("loading-text");

let loadingProgress = 0;
function updateLoadingProgress(progress, text) {
  loadingProgress = progress;
  progressFill.style.width = progress + "%";
  loadingText.textContent = text + " " + Math.round(progress) + "%";
}

// Simulate asset loading
function simulateLoading() {
  updateLoadingProgress(10, "Loading Three.js...");
  setTimeout(() => updateLoadingProgress(30, "Building track..."), 200);
  setTimeout(() => updateLoadingProgress(50, "Creating shops..."), 400);
  setTimeout(() => updateLoadingProgress(70, "Spawning F1 car..."), 600);
  setTimeout(() => updateLoadingProgress(90, "Initializing audio..."), 800);
  setTimeout(() => {
    updateLoadingProgress(100, "Ready!");
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      setTimeout(() => loadingScreen.remove(), 1000);
    }, 500);
  }, 1000);
}

simulateLoading();

// Shop data with enhanced descriptions
const shops = [
  {
    name: "🛒 Sparkathon - Walmart",
    description:
      "Hackathon conducted by Walmart! Built an AI chatbot to increase customer interaction and virtual try-on features for trying different product designs.",
    github: "https://github.com/Vedulaudayeaswar/sparkathon.git",
    angle: 0,
    color: 0xffd700,
    accentColor: 0xffaa00,
    icon: "🛒",
    shopType: "tech",
  },
  {
    name: "🧘 CodeCalm",
    description:
      "Mental wellness website with comprehensive features for developers and professionals to manage stress and maintain work-life balance.",
    github: "https://github.com/Vedulaudayeaswar/codecalm.git",
    angle: 36,
    color: 0x00ff88,
    accentColor: 0x00cc66,
    icon: "🧘",
    shopType: "wellness",
  },
  {
    name: "💡 Skills & Expertise",
    description:
      "Technical Skills: Python, SQL, PostgreSQL, Machine Learning, Deep Learning, Reinforcement Learning, LLM, Agentic AI, Deep Agents, HTML, CSS, JavaScript, Three.js, React, Redux, Golang, Flask, REST APIs, Core CS Fundamentals, RAG. Languages: English, Telugu, Hindi, Odia, Bengali (Primary Level)",
    link: "https://www.linkedin.com/in/uday-easwar-22290a27a/",
    angle: 72,
    color: 0x00ffff,
    accentColor: 0x00cccc,
    icon: "💡",
    shopType: "skills",
  },
  {
    name: "🤖 AIDevs",
    description:
      "Automatic website builder - full-stack frontend, backend, and API integration all at once as users need, step by step!",
    github: "https://github.com/Vedulaudayeaswar/AIDevs",
    angle: 108,
    color: 0x0088ff,
    accentColor: 0x0066cc,
    icon: "🤖",
    shopType: "ai",
  },
  {
    name: "📧 Cold Mail Generator",
    description:
      "Automated cold email generation using AI to craft personalized outreach messages.",
    github: "https://github.com/Vedulaudayeaswar/coldmails.git",
    angle: 144,
    color: 0xffff00,
    accentColor: 0xcccc00,
    icon: "📧",
    shopType: "automation",
  },
  {
    name: "🎮 AI Dungeon Game",
    description:
      "Interactive text-based adventure game powered by AI with dynamic storytelling.",
    github: "https://github.com/Vedulaudayeaswar/AI-Dungeon-Game.git",
    angle: 180,
    color: 0xff00ff,
    accentColor: 0xcc00cc,
    icon: "🎮",
    shopType: "game",
  },
  {
    name: "🤖 PatrolBot",
    description:
      "Agentic AI that autonomously evades obstacles with advanced path planning algorithms and SLAM capabilities.",
    github: "https://github.com/Vedulaudayeaswar/patrolbot.git",
    angle: 216,
    color: 0x00ffaa,
    accentColor: 0x00cc88,
    icon: "🤖",
    shopType: "robotics",
  },
  {
    name: "🎬 MediaMosaic",
    description:
      "Comprehensive media management and organization platform for content creators.",
    github: "https://github.com/Vedulaudayeaswar/MediaMosaic.git",
    angle: 252,
    color: 0xff8800,
    accentColor: 0xcc6600,
    icon: "🎬",
    shopType: "media",
  },
  {
    name: "🦾 DH Parameters",
    description:
      "Robotics kinematics visualization using Denavit-Hartenberg parameters for robotic arm simulation.",
    github: "https://github.com/Vedulaudayeaswar/DH-parameters.git",
    angle: 288,
    color: 0x8800ff,
    accentColor: 0x6600cc,
    icon: "🦾",
    shopType: "robotics",
  },
  {
    name: "📜 Certifications",
    description:
      "Collection of all certifications earned in AI, Machine Learning, Deep Learning, and software development.",
    link: "https://drive.google.com/drive/folders/1q_TTwgq6PgGk5zRR1Kl8SAXKPkXu5YUV?usp=sharing",
    angle: 324,
    color: 0xffd700,
    accentColor: 0xffaa00,
    icon: "📜",
    shopType: "achievements",
  },
];

// Scene setup with enhanced atmosphere
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000428);
scene.fog = new THREE.FogExp2(0x000428, 0.003); // Exponential fog for better depth

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
// Set initial camera position (bird's eye view of track)
camera.position.set(0, 80, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
  powerPreference: "high-performance",
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = false; // Disabled to fix WebGL errors
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5; // Brighter exposure for vibrant colors
renderer.outputColorSpace = THREE.SRGBColorSpace;

// 🔊 Sound Manager
const soundManager = new SoundManager(camera);

// ⭐ STARS IN THE SKY
function createStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starVertices = [];

  for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 400;
    const y = Math.random() * 100 + 30;
    const z = (Math.random() - 0.5) * 400;
    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3),
  );

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.8,
    transparent: true,
    opacity: 0.8,
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}

createStarField();

// Enhanced Lighting with realistic setup
const ambientLight = new THREE.AmbientLight(0x2a3f6f, 0.4);
scene.add(ambientLight);

// Main moonlight
const directionalLight = new THREE.DirectionalLight(0xaaccff, 2);
directionalLight.position.set(50, 100, 50);
directionalLight.castShadow = false; // Disabled for performance
scene.add(directionalLight);

// Hemisphere light for realistic sky-ground lighting
const hemiLight = new THREE.HemisphereLight(0x0088ff, 0x442200, 0.6);
scene.add(hemiLight);

// Stadium lights with dramatic spotlights (reduced from 20 to 8)
const trackRadius = 60;
for (let i = 0; i < 8; i++) {
  const angle = (i / 8) * Math.PI * 2;
  const colorCycle = i % 3;
  const lightColor =
    colorCycle === 0 ? 0x00d4ff : colorCycle === 1 ? 0xe10600 : 0xff00ff;

  const light = new THREE.SpotLight(lightColor, 5, 80, Math.PI / 5, 0.3, 1.5);
  light.position.set(
    Math.cos(angle) * (trackRadius + 25),
    18,
    Math.sin(angle) * (trackRadius + 25),
  );
  light.target.position.set(
    Math.cos(angle) * trackRadius,
    0,
    Math.sin(angle) * trackRadius,
  );
  light.castShadow = false; // Disable shadows to improve performance
  scene.add(light);
  scene.add(light.target);
}

// Circular Track
const trackInnerRadius = 45;
const trackOuterRadius = 75;

function createCircularTrack() {
  // Main track surface
  const trackShape = new THREE.Shape();
  const outerCurve = new THREE.EllipseCurve(
    0,
    0,
    trackOuterRadius,
    trackOuterRadius,
    0,
    2 * Math.PI,
    false,
    0,
  );
  const outerPoints = outerCurve.getPoints(100);
  trackShape.moveTo(outerPoints[0].x, outerPoints[0].y);
  outerPoints.forEach((point) => trackShape.lineTo(point.x, point.y));

  const holePath = new THREE.Path();
  const innerCurve = new THREE.EllipseCurve(
    0,
    0,
    trackInnerRadius,
    trackInnerRadius,
    0,
    2 * Math.PI,
    false,
    0,
  );
  const innerPoints = innerCurve.getPoints(100);
  holePath.moveTo(innerPoints[0].x, innerPoints[0].y);
  innerPoints.forEach((point) => holePath.lineTo(point.x, point.y));
  trackShape.holes.push(holePath);

  const trackGeometry = new THREE.ShapeGeometry(trackShape);

  // Realistic asphalt material with variations
  const trackMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.95,
    metalness: 0.05,
    envMapIntensity: 0.5,
  });
  const track = new THREE.Mesh(trackGeometry, trackMaterial);
  track.rotation.x = -Math.PI / 2;
  track.receiveShadow = true;
  scene.add(track);

  // Add track lane markings (racing lines)
  const laneMarkingMaterial = new THREE.MeshStandardMaterial({
    color: 0xffdd00,
    emissive: 0xffdd00,
    emissiveIntensity: 0.3,
  });

  // Inner lane marking
  const innerLaneRadius = trackInnerRadius + 8;
  const innerLaneCurve = new THREE.EllipseCurve(
    0,
    0,
    innerLaneRadius,
    innerLaneRadius,
    0,
    2 * Math.PI,
    false,
    0,
  );
  const innerLanePoints = innerLaneCurve.getPoints(100);
  const innerLaneGeometry = new THREE.BufferGeometry().setFromPoints(
    innerLanePoints,
  );
  const innerLaneLine = new THREE.Line(
    innerLaneGeometry,
    new THREE.LineBasicMaterial({
      color: 0xffdd00,
      linewidth: 2,
    }),
  );
  innerLaneLine.rotation.x = -Math.PI / 2;
  innerLaneLine.position.y = 0.06;
  scene.add(innerLaneLine);

  // Outer lane marking
  const outerLaneRadius = trackOuterRadius - 8;
  const outerLaneCurve = new THREE.EllipseCurve(
    0,
    0,
    outerLaneRadius,
    outerLaneRadius,
    0,
    2 * Math.PI,
    false,
    0,
  );
  const outerLanePoints = outerLaneCurve.getPoints(100);
  const outerLaneGeometry = new THREE.BufferGeometry().setFromPoints(
    outerLanePoints,
  );
  const outerLaneLine = new THREE.Line(
    outerLaneGeometry,
    new THREE.LineBasicMaterial({
      color: 0xffdd00,
      linewidth: 2,
    }),
  );
  outerLaneLine.rotation.x = -Math.PI / 2;
  outerLaneLine.position.y = 0.06;
  scene.add(outerLaneLine);

  // Checkered start/finish line (realistic pattern)
  const finishGeometry = new THREE.PlaneGeometry(
    trackOuterRadius - trackInnerRadius,
    10,
  );

  // Create checkered pattern
  const finishCanvas = document.createElement("canvas");
  finishCanvas.width = 512;
  finishCanvas.height = 512;
  const finishCtx = finishCanvas.getContext("2d");
  const checkSize = 64;
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      finishCtx.fillStyle = (x + y) % 2 === 0 ? "#ffffff" : "#000000";
      finishCtx.fillRect(x * checkSize, y * checkSize, checkSize, checkSize);
    }
  }

  const finishTexture = new THREE.CanvasTexture(finishCanvas);
  finishTexture.wrapS = finishTexture.wrapT = THREE.RepeatWrapping;
  finishTexture.repeat.set(2, 1);

  const finishMaterial = new THREE.MeshStandardMaterial({
    map: finishTexture,
    roughness: 0.8,
    metalness: 0.1,
  });
  const finishLine = new THREE.Mesh(finishGeometry, finishMaterial);
  finishLine.rotation.x = -Math.PI / 2;
  finishLine.position.set(
    0,
    0.06,
    trackInnerRadius + (trackOuterRadius - trackInnerRadius) / 2,
  );
  scene.add(finishLine);

  // Enhanced barriers with sponsor boards
  createBarriers(trackInnerRadius, 0xff0000);
  createBarriers(trackOuterRadius, 0x00d4ff);
}

function createBarriers(radius, color) {
  const segments = 20; // Reduced from 80 to avoid WebGL errors
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;

    const barrierGeometry = new THREE.BoxGeometry(3, 4, 0.3);
    const barrierMaterial = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.3,
      metalness: 0.7,
      roughness: 0.3,
    });
    const barrier = new THREE.Mesh(barrierGeometry, barrierMaterial);

    barrier.position.set(Math.cos(angle) * radius, 2, Math.sin(angle) * radius);
    barrier.lookAt(0, 2, 0);
    barrier.castShadow = false; // Disabled for performance
    scene.add(barrier);

    // Add sponsor board every 5th barrier
    if (i % 5 === 0) {
      const boardGeometry = new THREE.PlaneGeometry(2.5, 1);
      const boardMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: color,
        emissiveIntensity: 0.5,
      });
      const board = new THREE.Mesh(boardGeometry, boardMaterial);
      board.position.set(
        Math.cos(angle) * (radius + (radius > 60 ? 0.5 : -0.5)),
        3,
        Math.sin(angle) * (radius + (radius > 60 ? 0.5 : -0.5)),
      );
      board.lookAt(0, 3, 0);
      scene.add(board);
    }
  }
}

createCircularTrack();

// Ground outside track (stadium floor)
const groundGeometry = new THREE.CircleGeometry(150, 64);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x0a2a1a,
  roughness: 0.95,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.1;
ground.receiveShadow = true;
scene.add(ground);

// ✨ SKY TEXT - Name and Bio in 3D (MOVING DRAGON STYLE)
const skyTextGroup = new THREE.Group();
const textMeshes = [];

function create3DText(text, yOffset, size, color) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 4096; // DOUBLED for clarity
  canvas.height = 512; // DOUBLED for clarity

  context.fillStyle = "transparent";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = `bold ${size * 2}px Orbitron, Arial`; // DOUBLED size
  context.fillStyle = color;
  context.textAlign = "center";
  context.textBaseline = "middle";

  // White outline for contrast
  context.strokeStyle = "#ffffff";
  context.lineWidth = 8;
  context.strokeText(text, canvas.width / 2, canvas.height / 2);

  // Multi-layer glow for visibility
  context.shadowColor = color;
  context.shadowBlur = 40;
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  context.shadowBlur = 60;
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide,
    opacity: 1,
    depthTest: false, // Always visible on top
  });

  const geometry = new THREE.PlaneGeometry(200, 25); // EXTRA MASSIVE for visibility
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = yOffset;
  mesh.renderOrder = 999; // Render last to ensure visibility
  return mesh;
}

// Create single instance of each text - moving circularly in sky
const texts = [
  { text: "VEDULA UDAY EASWAR", yOffset: 0, size: 140, color: "#00d4ff" },
  {
    text: "Loves to Explore New Trends in Tech",
    yOffset: -25,
    size: 90,
    color: "#ffd700",
  },
  {
    text: "AI Enthusiast • Web Dev Enthusiast",
    yOffset: -50,
    size: 90,
    color: "#ff00ff",
  },
];

texts.forEach((textData, index) => {
  // Create JUST ONE copy of each text - it will rotate around via animation
  const radius = 110; // Closer to track
  const startAngle = (index / texts.length) * Math.PI * 2; // Spread texts around circle

  const textMesh = create3DText(
    textData.text,
    textData.yOffset,
    textData.size,
    textData.color,
  );

  textMesh.position.x = Math.cos(startAngle) * radius;
  textMesh.position.y = 60 + textData.yOffset; // Medium height - visible while racing
  textMesh.position.z = Math.sin(startAngle) * radius;

  // Face center
  textMesh.lookAt(0, 60 + textData.yOffset, 0);

  skyTextGroup.add(textMesh);
  textMeshes.push({ mesh: textMesh, baseY: 60 + textData.yOffset, index });
});

scene.add(skyTextGroup);

// Animate floating text - DRAGON MOTION (rotating + floating)
function animateSkyText() {
  const time = Date.now() * 0.001;

  // Rotate entire group - creates circular dragon motion
  skyTextGroup.rotation.y = time * 0.15; // Slow rotation

  // Individual floating motion
  textMeshes.forEach((item, i) => {
    item.mesh.position.y = item.baseY + Math.sin(time * 0.8 + i * 0.5) * 3;
  });
}

// 🚦 RACE START LIGHTS
const startLightsGroup = new THREE.Group();
const lightColors = [0xff0000, 0xff0000, 0xff0000, 0xff0000, 0xff0000];
const lightMeshes = [];

for (let i = 0; i < 5; i++) {
  const lightGeometry = new THREE.CircleGeometry(1.5, 32);
  const lightMaterial = new THREE.MeshBasicMaterial({
    color: 0x1a1a1a,
    emissive: 0x1a1a1a,
  });
  const lightMesh = new THREE.Mesh(lightGeometry, lightMaterial);
  lightMesh.position.set(i * 4 - 8, 15, 60);
  startLightsGroup.add(lightMesh);
  lightMeshes.push(lightMesh); // Fixed: was pushing lightMaterial instead of lightMesh
}
scene.add(startLightsGroup);

// AUDIENCE/CROWD - Animated spectators (RE-ENABLED)
const audienceGroup = new THREE.Group();
const crowdColors = [
  0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff,
];

function createAudience() {
  const audienceRadius = 90;
  const rows = 3; // Reduced from 5 to 3
  const seatsPerRow = 40; // Reduced from 80 to 40

  for (let row = 0; row < rows; row++) {
    for (let seat = 0; seat < seatsPerRow; seat++) {
      const angle = (seat / seatsPerRow) * Math.PI * 2;
      const radius = audienceRadius + row * 3;

      // Person body
      const bodyGeometry = new THREE.CapsuleGeometry(0.3, 0.8, 4, 8);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: crowdColors[Math.floor(Math.random() * crowdColors.length)],
        roughness: 0.7,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.set(
        Math.cos(angle) * radius,
        row * 2 + 1,
        Math.sin(angle) * radius,
      );
      body.lookAt(0, row * 2 + 1, 0);
      body.castShadow = false; // Disable shadows for performance

      // Head
      const headGeometry = new THREE.SphereGeometry(0.3, 8, 8);
      const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.copy(body.position);
      head.position.y += 0.8;

      audienceGroup.add(body);
      audienceGroup.add(head);

      // Store for animation
      body.userData.animOffset = Math.random() * Math.PI * 2;
      body.userData.baseY = body.position.y;
    }
  }

  scene.add(audienceGroup);
}

createAudience(); // RE-ENABLED!

// Animate crowd (waving, jumping)
function animateAudience() {
  const time = Date.now() * 0.001;
  audienceGroup.children.forEach((person) => {
    if (
      person.geometry.type === "CapsuleGeometry" &&
      person.userData.animOffset !== undefined
    ) {
      person.position.y =
        person.userData.baseY +
        Math.sin(time * 2 + person.userData.animOffset) * 0.3;
      person.rotation.z = Math.sin(time * 3 + person.userData.animOffset) * 0.1;
    }
  });
}

// Enhanced F1 Car
let car;
const carGroup = new THREE.Group();

function createF1Car() {
  // Main body with carbon fiber effect
  const bodyGeometry = new THREE.BoxGeometry(2.5, 0.6, 5);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xe10600,
    metalness: 1.0,
    roughness: 0.02,
    emissive: 0xe10600,
    emissiveIntensity: 0.3,
    envMapIntensity: 1.5,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.7;
  body.castShadow = true;
  carGroup.add(body);

  // Carbon fiber side panels
  const sidePanelGeometry = new THREE.BoxGeometry(2.6, 0.65, 5.1);
  const carbonMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    metalness: 0.9,
    roughness: 0.3,
  });
  const sidePanel = new THREE.Mesh(sidePanelGeometry, carbonMaterial);
  sidePanel.position.y = 0.7;
  sidePanel.scale.set(1.01, 1.05, 1.01);
  carGroup.add(sidePanel);

  // Cockpit with realistic glass
  const cockpitGeometry = new THREE.BoxGeometry(1.8, 0.5, 2);
  const cockpitMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x111111,
    metalness: 0,
    roughness: 0,
    transparent: true,
    opacity: 0.4,
    transmission: 0.9,
    thickness: 0.5,
    ior: 1.5,
    reflectivity: 0.95,
    clearcoat: 1.0,
  });
  const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
  cockpit.position.set(0, 1.2, 0.5);
  cockpit.castShadow = true;
  carGroup.add(cockpit);

  // Driver (will be extracted for victory animation)
  const driverGeometry = new THREE.CapsuleGeometry(0.3, 0.6, 4, 8);
  const driverMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
  const driver = new THREE.Mesh(driverGeometry, driverMaterial);
  driver.position.set(0, 1.2, 0.5);
  driver.rotation.x = Math.PI / 6;
  carGroup.add(driver);
  carGroup.userData.driver = driver;

  // Driver head
  const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
  const headMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.set(0, 1.7, 0.5);
  carGroup.add(head);
  carGroup.userData.driverHead = head;

  // Front wing
  const frontWingGeometry = new THREE.BoxGeometry(3.5, 0.1, 0.6);
  const frontWingMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    metalness: 0.9,
    roughness: 0.1,
  });
  const frontWing = new THREE.Mesh(frontWingGeometry, frontWingMaterial);
  frontWing.position.set(0, 0.3, 2.5);
  carGroup.add(frontWing);

  // Rear wing
  const rearWingGeometry = new THREE.BoxGeometry(3.5, 0.15, 1.2);
  const rearWingMaterial = new THREE.MeshStandardMaterial({
    color: 0xe10600,
    metalness: 0.9,
    roughness: 0.1,
  });
  const rearWing = new THREE.Mesh(rearWingGeometry, rearWingMaterial);
  rearWing.position.set(0, 2, -2.5);
  carGroup.add(rearWing);

  // Support struts
  const strutGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 8);
  const strutMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    metalness: 0.9,
  });
  [-1.2, 1.2].forEach((x) => {
    const strut = new THREE.Mesh(strutGeometry, strutMaterial);
    strut.position.set(x, 1.3, -2.5);
    carGroup.add(strut);
  });

  // Enhanced wheels with tire details
  const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.6, 32);
  const wheelMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    metalness: 0.3,
    roughness: 0.95,
  });

  // Rim material (chrome)
  const rimGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.65, 32);
  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    metalness: 1.0,
    roughness: 0.05,
    envMapIntensity: 2.0,
  });

  const brakeGeometry = new THREE.CylinderGeometry(0.32, 0.32, 0.15, 32);
  const brakeMaterial = new THREE.MeshStandardMaterial({
    color: 0xff4500,
    emissive: 0xff4500,
    emissiveIntensity: 1.2,
    metalness: 1.0,
    roughness: 0.1,
  });

  const wheelPositions = [
    { x: -1.4, y: 0.5, z: 2 },
    { x: 1.4, y: 0.5, z: 2 },
    { x: -1.4, y: 0.5, z: -2 },
    { x: 1.4, y: 0.5, z: -2 },
  ];

  carGroup.userData.wheels = [];
  wheelPositions.forEach((pos) => {
    // Tire
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(pos.x, pos.y, pos.z);
    wheel.castShadow = true;
    carGroup.add(wheel);
    carGroup.userData.wheels.push(wheel);

    // Chrome rim
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    rim.rotation.z = Math.PI / 2;
    rim.position.set(pos.x, pos.y, pos.z);
    carGroup.add(rim);

    // Glowing brake disc
    const brake = new THREE.Mesh(brakeGeometry, brakeMaterial);
    brake.rotation.z = Math.PI / 2;
    brake.position.set(pos.x > 0 ? pos.x - 0.35 : pos.x + 0.35, pos.y, pos.z);
    carGroup.add(brake);
  });

  // Headlights with lens flare effect
  [-0.9, 0.9].forEach((x) => {
    const lightGeometry = new THREE.CircleGeometry(0.25, 16);
    const lightMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 2,
    });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(x, 0.6, 2.6);
    light.rotation.y = Math.PI;
    carGroup.add(light);

    const spotlight = new THREE.SpotLight(0xffffff, 3, 50, Math.PI / 6, 0.5, 2);
    spotlight.position.set(x, 0.6, 2.5);
    spotlight.target.position.set(x, 0, 20);
    spotlight.castShadow = true;
    carGroup.add(spotlight);
    carGroup.add(spotlight.target);
  });

  // Exhaust pipes with flames
  [-0.7, 0.7].forEach((x, index) => {
    // Exhaust pipe
    const exhaustGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.6, 16);
    const exhaustMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 1.0,
      roughness: 0.2,
      emissive: 0xff4400,
      emissiveIntensity: 0.3,
    });
    const exhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
    exhaust.rotation.x = Math.PI / 2;
    exhaust.position.set(x, 0.6, -2.7);
    carGroup.add(exhaust);

    // Flame effect (animated)
    const flameGeometry = new THREE.ConeGeometry(0.15, 0.8, 8);
    const flameMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.8,
    });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.rotation.x = -Math.PI / 2;
    flame.position.set(x, 0.6, -3.1);
    carGroup.add(flame);

    // Inner flame glow
    const innerFlameGeometry = new THREE.ConeGeometry(0.1, 0.6, 8);
    const innerFlameMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.9,
    });
    const innerFlame = new THREE.Mesh(innerFlameGeometry, innerFlameMaterial);
    innerFlame.rotation.x = -Math.PI / 2;
    innerFlame.position.set(x, 0.6, -3.0);
    carGroup.add(innerFlame);

    // Point light from exhaust
    const exhaustLight = new THREE.PointLight(0xff6600, 2, 8);
    exhaustLight.position.set(x, 0.6, -3.1);
    carGroup.add(exhaustLight);

    // Store flames for animation
    if (!carGroup.userData.exhaustFlames) carGroup.userData.exhaustFlames = [];
    carGroup.userData.exhaustFlames.push({ flame, innerFlame, exhaustLight });
  });

  // Under-glow effect
  const underglowLight = new THREE.PointLight(0x00d4ff, 3, 10);
  underglowLight.position.set(0, 0.2, 0);
  carGroup.add(underglowLight);

  // Position car
  carGroup.position.set(0, 0, trackInnerRadius + 15);
  scene.add(carGroup);
  car = carGroup;
}

createF1Car();

// MODERN SHOP BUILDINGS (inspired by your image)
const shopObjects = [];
const shopkeepers = [];

function createModernShop(shopData) {
  const group = new THREE.Group();
  const radius = (trackInnerRadius + trackOuterRadius) / 2;
  const angleRad = (shopData.angle * Math.PI) / 180;

  // Base platform with metallic reflection
  const platformGeometry = new THREE.CylinderGeometry(5.5, 6, 0.8, 64);
  const platformMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 1.0,
    roughness: 0.05,
    envMapIntensity: 1.5,
  });
  const platform = new THREE.Mesh(platformGeometry, platformMaterial);
  platform.position.y = 0.4;
  platform.receiveShadow = true;
  group.add(platform);

  // LED ring around platform
  const ledRingGeometry = new THREE.TorusGeometry(5.8, 0.15, 16, 64);
  const ledRingMaterial = new THREE.MeshStandardMaterial({
    color: shopData.color,
    emissive: shopData.color,
    emissiveIntensity: 2,
    metalness: 0.9,
    roughness: 0.1,
  });
  const ledRing = new THREE.Mesh(ledRingGeometry, ledRingMaterial);
  ledRing.rotation.x = Math.PI / 2;
  ledRing.position.y = 0.8;
  group.add(ledRing);

  // Main building structure with beveled edges
  const mainBuildingGeometry = new THREE.BoxGeometry(5.5, 10, 5.5);
  const mainBuildingMaterial = new THREE.MeshStandardMaterial({
    color: 0x0f0f0f,
    metalness: 0.95,
    roughness: 0.15,
    emissive: 0x050505,
    emissiveIntensity: 0.2,
    envMapIntensity: 1.2,
  });
  const mainBuilding = new THREE.Mesh(
    mainBuildingGeometry,
    mainBuildingMaterial,
  );
  mainBuilding.position.y = 5.9;
  mainBuilding.castShadow = true;
  group.add(mainBuilding);

  // Glass facade with realistic refraction
  const glassGeometry = new THREE.BoxGeometry(5, 9.5, 0.3);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: shopData.color,
    metalness: 0,
    roughness: 0,
    transparent: true,
    opacity: 0.3,
    transmission: 0.95,
    thickness: 0.8,
    ior: 1.5,
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });
  const glassFacade = new THREE.Mesh(glassGeometry, glassMaterial);
  glassFacade.position.set(0, 5.9, 2.85);
  group.add(glassFacade);

  // Neon accent strips with glow
  const accentGeometry = new THREE.BoxGeometry(5.5, 0.4, 0.4);
  const accentMaterial = new THREE.MeshStandardMaterial({
    color: shopData.color,
    emissive: shopData.color,
    emissiveIntensity: 2.5,
    metalness: 1.0,
    roughness: 0,
  });

  for (let i = 0; i < 6; i++) {
    const accent = new THREE.Mesh(accentGeometry, accentMaterial);
    accent.position.set(0, 1.5 + i * 1.8, 2.95);
    group.add(accent);

    // Add glow boxes around neon
    const glowGeometry = new THREE.BoxGeometry(5.7, 0.6, 0.6);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: shopData.color,
      transparent: true,
      opacity: 0.3,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(0, 1.5 + i * 1.8, 2.95);
    group.add(glow);
  }

  // Vertical neon pillars with chrome edges
  const pillarGeometry = new THREE.BoxGeometry(0.4, 11, 0.4);
  [-2.5, 2.5].forEach((x) => {
    const pillar = new THREE.Mesh(pillarGeometry, accentMaterial);
    pillar.position.set(x, 6.3, 2.95);
    group.add(pillar);

    // Chrome edge highlights
    const edgeGeometry = new THREE.BoxGeometry(0.5, 11, 0.5);
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0,
      emissive: shopData.color,
      emissiveIntensity: 0.5,
    });
    const edge = new THREE.Mesh(edgeGeometry, edgeMaterial);
    edge.position.set(x, 6.3, 2.95);
    edge.scale.set(1.05, 1.02, 1.05);
    group.add(edge);
  });

  // Holographic sign/logo with depth
  const signGeometry = new THREE.BoxGeometry(4, 2, 0.3);
  const signMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    emissive: shopData.color,
    emissiveIntensity: 3,
    metalness: 0.8,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0,
    transmission: 0.2,
  });
  const sign = new THREE.Mesh(signGeometry, signMaterial);
  sign.position.set(0, 11.8, 0);
  group.add(sign);

  // Sign backing glow
  const signGlowGeometry = new THREE.BoxGeometry(4.3, 2.3, 0.4);
  const signGlowMaterial = new THREE.MeshBasicMaterial({
    color: shopData.color,
    transparent: true,
    opacity: 0.6,
  });
  const signGlow = new THREE.Mesh(signGlowGeometry, signGlowMaterial);
  signGlow.position.set(0, 11.8, -0.1);
  group.add(signGlow);

  // Floating holographic marker above building
  const markerGeometry = new THREE.OctahedronGeometry(1.2, 0);
  const markerMaterial = new THREE.MeshPhysicalMaterial({
    color: shopData.color,
    emissive: shopData.color,
    emissiveIntensity: 3,
    metalness: 1.0,
    roughness: 0,
    clearcoat: 1.0,
    transmission: 0.5,
  });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  marker.position.y = 14;
  group.add(marker);

  // Rotating outer ring for marker
  const ringGeometry = new THREE.TorusGeometry(1.8, 0.08, 16, 64);
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: shopData.color,
    emissive: shopData.color,
    emissiveIntensity: 2,
    metalness: 1.0,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.position.y = 14;
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  // Store ring reference for animation
  marker.userData.ring = ring;

  // 🏷️ FLOATING NAME LABEL (3D Text above building)
  const labelCanvas = document.createElement("canvas");
  const labelContext = labelCanvas.getContext("2d");
  labelCanvas.width = 1024;
  labelCanvas.height = 256;

  labelContext.fillStyle = "rgba(0, 0, 0, 0.7)";
  labelContext.fillRect(0, 0, labelCanvas.width, labelCanvas.height);

  labelContext.font = "bold 80px Orbitron, Arial";
  labelContext.fillStyle = `rgb(${(shopData.color >> 16) & 255}, ${
    (shopData.color >> 8) & 255
  }, ${shopData.color & 255})`;
  labelContext.textAlign = "center";
  labelContext.textBaseline = "middle";
  labelContext.shadowColor = `rgb(${(shopData.color >> 16) & 255}, ${
    (shopData.color >> 8) & 255
  }, ${shopData.color & 255})`;
  labelContext.shadowBlur = 20;
  labelContext.fillText(
    shopData.icon + " " + shopData.name.split(" - ")[0],
    labelCanvas.width / 2,
    labelCanvas.height / 2,
  );

  const labelTexture = new THREE.CanvasTexture(labelCanvas);
  const labelMaterial = new THREE.MeshBasicMaterial({
    map: labelTexture,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const labelGeometry = new THREE.PlaneGeometry(10, 2.5);
  const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
  labelMesh.position.y = 16;
  labelMesh.lookAt(0, 16, 0);
  group.add(labelMesh);

  // Multi-point lighting system for dramatic effect
  const shopLight = new THREE.PointLight(shopData.color, 8, 40);
  shopLight.position.y = 14;
  shopLight.castShadow = true;
  group.add(shopLight);

  // Secondary accent lights
  [-2.5, 2.5].forEach((x) => {
    const accentLight = new THREE.PointLight(shopData.color, 3, 15);
    accentLight.position.set(x, 8, 2.8);
    group.add(accentLight);
  });

  // Spotlight from above with volumetric effect
  const spotlight = new THREE.SpotLight(
    shopData.color,
    10,
    25,
    Math.PI / 6,
    0.3,
    2,
  );
  spotlight.position.set(0, 18, 0);
  spotlight.target.position.set(0, 0, 0);
  spotlight.castShadow = true;
  group.add(spotlight);
  group.add(spotlight.target);

  // Add particle system for shop (energy field)
  const particleCount = 50;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);

  const colorObj = new THREE.Color(shopData.color);
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 3;
    const height = Math.random() * 12;

    particlePositions[i * 3] = Math.cos(angle) * radius;
    particlePositions[i * 3 + 1] = height;
    particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

    particleColors[i * 3] = colorObj.r;
    particleColors[i * 3 + 1] = colorObj.g;
    particleColors[i * 3 + 2] = colorObj.b;
  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3),
  );
  particleGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(particleColors, 3),
  );

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  group.add(particleSystem);

  // Store particle system for animation
  marker.userData.particles = particleSystem;

  // Interaction zone (glowing circle)
  const zoneGeometry = new THREE.CylinderGeometry(7, 7, 0.4, 64);
  const zoneMaterial = new THREE.MeshStandardMaterial({
    color: shopData.color,
    transparent: true,
    opacity: 0.3,
    emissive: shopData.color,
    emissiveIntensity: 0.8,
  });
  const zone = new THREE.Mesh(zoneGeometry, zoneMaterial);
  zone.position.y = 0.2;
  group.add(zone);

  // SHOPKEEPER (person who delivers product)
  const shopkeeperGroup = new THREE.Group();

  // Body
  const bodyGeometry = new THREE.CapsuleGeometry(0.4, 1.2, 8, 16);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: shopData.accentColor,
    roughness: 0.7,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.set(3, 1.2, 0);
  body.castShadow = true;
  shopkeeperGroup.add(body);

  // Head
  const headGeometry = new THREE.SphereGeometry(0.35, 16, 16);
  const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.set(3, 2.1, 0);
  head.castShadow = true;
  shopkeeperGroup.add(head);

  // Product box (they're holding)
  const productGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
  const productMaterial = new THREE.MeshStandardMaterial({
    color: shopData.color,
    emissive: shopData.color,
    emissiveIntensity: 0.5,
  });
  const product = new THREE.Mesh(productGeometry, productMaterial);
  product.position.set(3, 1.5, 0.5);
  product.castShadow = true;
  shopkeeperGroup.add(product);

  group.add(shopkeeperGroup);
  shopkeeperGroup.userData.initialPos = { x: 3, y: 1.2, z: 0 };
  shopkeeperGroup.userData.animating = false;

  // Position shop
  group.position.set(
    Math.cos(angleRad) * radius,
    0,
    Math.sin(angleRad) * radius,
  );
  group.lookAt(0, 0, 0);

  group.userData = {
    ...shopData,
    collected: false,
    marker,
    zone,
    mainBuilding,
    shopkeeper: shopkeeperGroup,
    product,
    body,
    label: labelMesh, // Store label for animation
  };

  scene.add(group);
  shopObjects.push(group);
  shopkeepers.push(shopkeeperGroup);
}

shops.forEach((shop) => createModernShop(shop));

// Animate shopkeeper delivery
function animateShopkeeperDelivery(shopkeeper) {
  if (shopkeeper.userData.animating) return;
  shopkeeper.userData.animating = true;

  const startTime = Date.now();
  const duration = 2000;
  const initialPos = shopkeeper.userData.initialPos;
  const targetPos = { x: 0, z: 0 }; // Move towards car

  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease in-out
    const eased =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    if (progress < 0.5) {
      // Move towards car
      shopkeeper.children[0].position.x =
        initialPos.x + (targetPos.x - initialPos.x) * eased * 2;
      shopkeeper.children[0].position.z =
        initialPos.z + (targetPos.z - initialPos.z) * eased * 2;
      shopkeeper.children[1].position.x = shopkeeper.children[0].position.x;
      shopkeeper.children[1].position.z = shopkeeper.children[0].position.z;
      shopkeeper.children[2].position.x = shopkeeper.children[0].position.x;
      shopkeeper.children[2].position.z =
        shopkeeper.children[0].position.z + 0.5;
    } else {
      // Return to shop
      const returnProgress = (progress - 0.5) * 2;
      shopkeeper.children[0].position.x =
        targetPos.x + (initialPos.x - targetPos.x) * returnProgress;
      shopkeeper.children[0].position.z =
        targetPos.z + (initialPos.z - targetPos.z) * returnProgress;
      shopkeeper.children[1].position.x = shopkeeper.children[0].position.x;
      shopkeeper.children[1].position.z = shopkeeper.children[0].position.z;
      shopkeeper.children[2].position.x = shopkeeper.children[0].position.x;
      shopkeeper.children[2].position.z =
        shopkeeper.children[0].position.z + 0.5;
    }

    // Waving animation
    shopkeeper.children[0].rotation.z = Math.sin(elapsed * 0.01) * 0.2;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      shopkeeper.userData.animating = false;
    }
  }

  animate();
}

// VICTORY CELEBRATION - Driver exits car and dances
let victoryDriver = null;
let victoryTrophy = null;

function createVictoryCelebration() {
  // Extract driver from car
  const driverPos = car.userData.driver.getWorldPosition(new THREE.Vector3());

  const celebrationGroup = new THREE.Group();

  // Driver body
  const bodyGeometry = new THREE.CapsuleGeometry(0.4, 1.5, 8, 16);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    roughness: 0.6,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.copy(driverPos);
  body.position.y = 1.2;
  body.castShadow = true;
  celebrationGroup.add(body);

  // Head
  const headGeometry = new THREE.SphereGeometry(0.4, 16, 16);
  const headMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.copy(driverPos);
  head.position.y = 2.2;
  head.castShadow = true;
  celebrationGroup.add(head);

  // Trophy (with GitHub/LinkedIn as engraving)
  const trophyGroup = new THREE.Group();

  // Trophy base
  const baseGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.2, 32);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 1,
    roughness: 0.1,
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  trophyGroup.add(base);

  // Trophy stem
  const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16);
  const stem = new THREE.Mesh(stemGeometry, baseMaterial);
  stem.position.y = 0.35;
  trophyGroup.add(stem);

  // Trophy cup
  const cupGeometry = new THREE.CylinderGeometry(0.4, 0.3, 0.6, 32);
  const cup = new THREE.Mesh(cupGeometry, baseMaterial);
  cup.position.y = 0.9;
  trophyGroup.add(cup);

  // Handles
  const handleGeometry = new THREE.TorusGeometry(0.25, 0.05, 16, 32, Math.PI);
  [-0.4, 0.4].forEach((x) => {
    const handle = new THREE.Mesh(handleGeometry, baseMaterial);
    handle.position.set(x, 0.9, 0);
    handle.rotation.y = x > 0 ? Math.PI / 2 : -Math.PI / 2;
    trophyGroup.add(handle);
  });

  trophyGroup.position.copy(driverPos);
  trophyGroup.position.y = 2.5;
  trophyGroup.position.z += 1.5;
  trophyGroup.castShadow = true;

  // Trophy light
  const trophyLight = new THREE.PointLight(0xffd700, 3, 10);
  trophyLight.position.copy(trophyGroup.position);
  scene.add(trophyLight);

  scene.add(celebrationGroup);
  scene.add(trophyGroup);

  victoryDriver = celebrationGroup;
  victoryTrophy = trophyGroup;

  // Hide driver in car
  car.userData.driver.visible = false;
  car.userData.driverHead.visible = false;

  // Start dance animation
  animateVictoryDance();
}

function animateVictoryDance() {
  const startTime = Date.now();

  function dance() {
    if (!victoryDriver) return;

    const elapsed = (Date.now() - startTime) * 0.001;

    // Dance moves
    victoryDriver.children[0].rotation.z = Math.sin(elapsed * 5) * 0.3;
    victoryDriver.children[0].rotation.y = Math.sin(elapsed * 3) * 0.5;
    victoryDriver.children[0].position.y =
      1.2 + Math.abs(Math.sin(elapsed * 6)) * 0.5;

    victoryDriver.children[1].rotation.x = Math.sin(elapsed * 4) * 0.2;
    victoryDriver.children[1].position.y =
      victoryDriver.children[0].position.y + 1;

    // Trophy rotation
    victoryTrophy.rotation.y += 0.02;
    victoryTrophy.position.y = 2.5 + Math.sin(elapsed * 3) * 0.2;

    requestAnimationFrame(dance);
  }

  dance();
}

// Confetti explosion
function createConfetti(position) {
  const confettiGroup = new THREE.Group();
  const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];

  for (let i = 0; i < 100; i++) {
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshStandardMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      emissive: colors[Math.floor(Math.random() * colors.length)],
      emissiveIntensity: 0.5,
    });
    const confetti = new THREE.Mesh(geometry, material);

    confetti.position.copy(position);
    confetti.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      Math.random() * 3 + 2,
      (Math.random() - 0.5) * 2,
    );
    confetti.angularVelocity = new THREE.Vector3(
      Math.random() * 0.2,
      Math.random() * 0.2,
      Math.random() * 0.2,
    );

    confettiGroup.add(confetti);
  }

  scene.add(confettiGroup);

  // Animate confetti
  const startTime = Date.now();
  function animateConfetti() {
    const elapsed = (Date.now() - startTime) * 0.001;

    if (elapsed > 5) {
      scene.remove(confettiGroup);
      return;
    }

    confettiGroup.children.forEach((confetti) => {
      confetti.velocity.y -= 0.01; // Gravity
      confetti.position.add(confetti.velocity.clone().multiplyScalar(0.016));
      confetti.rotation.x += confetti.angularVelocity.x;
      confetti.rotation.y += confetti.angularVelocity.y;
      confetti.rotation.z += confetti.angularVelocity.z;
    });

    requestAnimationFrame(animateConfetti);
  }

  animateConfetti();
}

// ===== DUST PARTICLES =====
const dustParticles = [];
function createDustParticle(position) {
  const geometry = new THREE.SphereGeometry(0.2, 8, 8);
  const material = new THREE.MeshBasicMaterial({
    color: 0x8b7355,
    transparent: true,
    opacity: 0.6,
  });
  const dust = new THREE.Mesh(geometry, material);
  dust.position.copy(position);
  dust.position.y = 0.5;
  dust.velocity = new THREE.Vector3(
    (Math.random() - 0.5) * 0.5,
    Math.random() * 0.3,
    (Math.random() - 0.5) * 0.5,
  );
  dust.life = 1.0;

  scene.add(dust);
  dustParticles.push(dust);
}

function updateDustParticles() {
  for (let i = dustParticles.length - 1; i >= 0; i--) {
    const dust = dustParticles[i];
    dust.position.add(dust.velocity.clone().multiplyScalar(0.016));
    dust.life -= 0.02;
    dust.material.opacity = dust.life * 0.6;
    dust.scale.multiplyScalar(1.02);

    if (dust.life <= 0) {
      scene.remove(dust);
      dustParticles.splice(i, 1);
    }
  }
}

// ===== TIRE SKID MARKS =====
const skidMarks = [];
let lastSkidPosition = null;

function createSkidMark(position) {
  if (lastSkidPosition && lastSkidPosition.distanceTo(position) < 1) return;

  const geometry = new THREE.PlaneGeometry(1, 0.3);
  const material = new THREE.MeshBasicMaterial({
    color: 0x1a1a1a,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
  });
  const skid = new THREE.Mesh(geometry, material);
  skid.position.copy(position);
  skid.position.y = 0.02;
  skid.rotation.x = -Math.PI / 2;
  skid.rotation.z = car.rotation.y;
  skid.life = 5.0;

  scene.add(skid);
  skidMarks.push(skid);
  lastSkidPosition = position.clone();

  // Limit skid marks
  if (skidMarks.length > 100) {
    const old = skidMarks.shift();
    scene.remove(old);
  }
}

function updateSkidMarks() {
  for (let i = skidMarks.length - 1; i >= 0; i--) {
    const skid = skidMarks[i];
    skid.life -= 0.01;
    skid.material.opacity = (skid.life / 5) * 0.8;

    if (skid.life <= 0) {
      scene.remove(skid);
      skidMarks.splice(i, 1);
    }
  }
}

// Game state
let racerName = "";
let gameStarted = false;
let collectedCount = 0;
let currentLap = 0;
const totalShops = shopObjects.length;
let carSpeed = 0;
const maxSpeed = 2.0;
const acceleration = 0.06;
const deceleration = 0.04;
const turnSpeed = 0.07; // Increased for better responsiveness
const keys = {};
let nearShop = null;
let startAngle = null;
let crossedStart = false;

// UI Elements
const welcomeScreen = document.getElementById("welcome-screen");
const racerInput = document.getElementById("racer-name-input");
const enterButton = document.getElementById("enter-track-button");
const introAnimation = document.getElementById("intro-animation");
const introText = document.getElementById("intro-text");
const racerNameDisplay = document.getElementById("racer-name-display");
const nearShopIndicator = document.getElementById("near-shop-indicator");
const victoryScreen = document.getElementById("victory-screen");
const victoryRacerName = document.getElementById("victory-racer-name");

// 🔊 Sound Enable Button (must be clicked due to browser autoplay policy)
const audioEnableButton = document.getElementById("audio-enable-button");

audioEnableButton.addEventListener("click", async () => {
  console.log("🎵 Loading sound system...");
  audioEnableButton.textContent = "⏳ LOADING SOUNDS...";

  // Try to load real sound files, fallback to placeholders
  await soundManager.loadAllSounds();

  // Hide the button
  audioEnableButton.classList.add("hidden");

  console.log("✅ Sound system ready!");
});

// Enable button when name is entered
racerInput.addEventListener("input", () => {
  enterButton.disabled = racerInput.value.trim().length === 0;
});

// Enter track button
enterButton.addEventListener("click", () => {
  racerName = racerInput.value.trim();
  if (!racerName) return;

  welcomeScreen.classList.add("hidden");
  introAnimation.classList.add("active");

  setTimeout(() => {
    introText.textContent = `Welcome, ${racerName}!`;
  }, 500);
  setTimeout(() => {
    introText.textContent = "Walking to your F1 car...";
  }, 2000);
  setTimeout(() => {
    introText.textContent = "Getting into the cockpit...";
  }, 3500);
  setTimeout(() => {
    introText.textContent = "Engine starting... 🏎️";
  }, 5000);

  // 🚦 START LIGHTS SEQUENCE (like F1)
  setTimeout(() => {
    introText.textContent = "Get ready...";
    if (lightMeshes[0] && lightMeshes[0].material) {
      lightMeshes[0].material.color.setHex(0xff0000);
      lightMeshes[0].material.emissive.setHex(0xff0000);
    }
  }, 6000);
  setTimeout(() => {
    if (lightMeshes[1] && lightMeshes[1].material) {
      lightMeshes[1].material.color.setHex(0xff0000);
      lightMeshes[1].material.emissive.setHex(0xff0000);
    }
  }, 6300);
  setTimeout(() => {
    if (lightMeshes[2] && lightMeshes[2].material) {
      lightMeshes[2].material.color.setHex(0xff0000);
      lightMeshes[2].material.emissive.setHex(0xff0000);
    }
  }, 6600);
  setTimeout(() => {
    if (lightMeshes[3] && lightMeshes[3].material) {
      lightMeshes[3].material.color.setHex(0xff0000);
      lightMeshes[3].material.emissive.setHex(0xff0000);
    }
  }, 6900);
  setTimeout(() => {
    if (lightMeshes[4] && lightMeshes[4].material) {
      lightMeshes[4].material.color.setHex(0xff0000);
      lightMeshes[4].material.emissive.setHex(0xff0000);
    }
  }, 7200);
  setTimeout(() => {
    introText.textContent = "LIGHTS OUT AND AWAY WE GO!";
    // Turn off all lights
    lightMeshes.forEach((light) => {
      if (light && light.material) {
        light.material.color.setHex(0x1a1a1a);
        light.material.emissive.setHex(0x1a1a1a);
      }
    });
  }, 7500);

  setTimeout(() => {
    introAnimation.classList.remove("active");
    gameStarted = true;
    racerNameDisplay.textContent = `Racer: ${racerName}`;

    // 🔊 SOUND: Start engine and crowd when race begins
    if (soundManager.isInitialized) {
      soundManager.play("engine");
      soundManager.play("crowdAmbient");
    }
  }, 8000);
});

// Input handlers
window.addEventListener("keydown", (e) => {
  if (e.key) keys[e.key.toLowerCase()] = true;
  if (e.key === " " && nearShop && !nearShop.userData.collected) {
    e.preventDefault();
    enterShop(nearShop);
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key) keys[e.key.toLowerCase()] = false;
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===== CAMERA MODES =====
let cameraMode = "chase"; // 'chase', 'cockpit', 'top'
const cameraModeBtn = document.getElementById("camera-mode-btn");

cameraModeBtn.addEventListener("click", () => {
  if (cameraMode === "chase") {
    cameraMode = "cockpit";
    cameraModeBtn.textContent = "📷 Cockpit View";
  } else if (cameraMode === "cockpit") {
    cameraMode = "top";
    cameraModeBtn.textContent = "📷 Top View";
  } else {
    cameraMode = "chase";
    cameraModeBtn.textContent = "📷 Chase Cam";
  }
});

// ===== DAY/NIGHT MODE =====
let isNightMode = false;
const dayNightBtn = document.getElementById("day-night-btn");

dayNightBtn.addEventListener("click", () => {
  isNightMode = !isNightMode;

  if (isNightMode) {
    // Night mode - darker, more neon
    scene.background = new THREE.Color(0x000011);
    scene.fog = new THREE.FogExp2(0x000011, 0.004);
    ambientLight.intensity = 0.2;
    directionalLight.intensity = 0.5;
    hemiLight.intensity = 0.3;
    dayNightBtn.textContent = "🌙 Night Mode";

    // Make neon lights brighter at night
    shopObjects.forEach((shop) => {
      if (shop.children) {
        shop.children.forEach((child) => {
          if (
            child.material &&
            child.material.emissiveIntensity !== undefined
          ) {
            child.material.emissiveIntensity *= 2;
          }
        });
      }
    });
  } else {
    // Day mode - brighter
    scene.background = new THREE.Color(0x000428);
    scene.fog = new THREE.FogExp2(0x000428, 0.003);
    ambientLight.intensity = 0.4;
    directionalLight.intensity = 2;
    hemiLight.intensity = 0.6;
    dayNightBtn.textContent = "☀️ Day Mode";

    // Reset shop lights
    shopObjects.forEach((shop) => {
      if (shop.children) {
        shop.children.forEach((child) => {
          if (
            child.material &&
            child.material.emissiveIntensity !== undefined
          ) {
            child.material.emissiveIntensity /= 2;
          }
        });
      }
    });
  }
});

// ===== MOBILE CONTROLS =====
const mobileControls = document.getElementById("mobile-controls");
const joystickStick = document.getElementById("stick-left");
const btnAccelerate = document.getElementById("btn-accelerate");
const btnBrake = document.getElementById("btn-brake");
const btnEnter = document.getElementById("btn-enter");

// Detect mobile
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
) {
  mobileControls.style.display = "block";
}

let joystickActive = false;
let joystickAngle = 0;

// Joystick for steering
const joystickBase = document.querySelector(".joystick-base");
joystickBase.addEventListener("touchstart", (e) => {
  joystickActive = true;
});

joystickBase.addEventListener("touchmove", (e) => {
  if (!joystickActive) return;
  e.preventDefault();

  const touch = e.touches[0];
  const rect = joystickBase.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const deltaX = touch.clientX - centerX;
  const deltaY = touch.clientY - centerY;

  const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 35);
  const angle = Math.atan2(deltaY, deltaX);

  joystickStick.style.left = `calc(50% + ${Math.cos(angle) * distance}px)`;
  joystickStick.style.top = `calc(50% + ${Math.sin(angle) * distance}px)`;

  // Set steering based on X position
  joystickAngle = deltaX / 35; // -1 to 1
});

joystickBase.addEventListener("touchend", () => {
  joystickActive = false;
  joystickAngle = 0;
  joystickStick.style.left = "50%";
  joystickStick.style.top = "50%";
});

// Mobile buttons
btnAccelerate.addEventListener("touchstart", (e) => {
  e.preventDefault();
  keys["w"] = true;
});
btnAccelerate.addEventListener("touchend", (e) => {
  e.preventDefault();
  keys["w"] = false;
});
btnBrake.addEventListener("touchstart", (e) => {
  e.preventDefault();
  keys["s"] = true;
});
btnBrake.addEventListener("touchend", (e) => {
  e.preventDefault();
  keys["s"] = false;
});
btnEnter.addEventListener("touchstart", (e) => {
  e.preventDefault();
  if (nearShop && !nearShop.userData.collected) {
    enterShop(nearShop);
  }
});

// ===== SHOP TOOLTIPS (HOVER PREVIEW) =====
const shopTooltip = document.getElementById("shop-tooltip");
const tooltipTitle = document.getElementById("tooltip-title");
const tooltipDescription = document.getElementById("tooltip-description");

let hoveredShop = null;
let mouseX = 0,
  mouseY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Raycast for shop hover detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (e) => {
  // Click to preview shop (without entering)
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(shopObjects, true);

  if (intersects.length > 0) {
    let shopObj = intersects[0].object;
    while (shopObj.parent && !shopObj.userData.shopData) {
      shopObj = shopObj.parent;
    }

    if (shopObj.userData.shopData && !shopObj.userData.collected) {
      // Show shop details without collecting
      showShopPreview(shopObj.userData.shopData);
    }
  }
});

function showShopPreview(shopData) {
  const modal = document.getElementById("shop-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalLinks = document.getElementById("modal-links");
  const modalThumbnail = document.getElementById("modal-thumbnail");

  modalThumbnail.textContent = shopData.icon;
  modalTitle.textContent = shopData.name;
  modalDescription.textContent = shopData.description;

  modalLinks.innerHTML = "";
  if (shopData.github) {
    const link = document.createElement("a");
    link.href = shopData.github;
    link.target = "_blank";
    link.textContent = "🔗 View on GitHub";
    modalLinks.appendChild(link);
  }
  if (shopData.link) {
    const link = document.createElement("a");
    link.href = shopData.link;
    link.target = "_blank";
    link.textContent = "🔗 Visit Link";
    modalLinks.appendChild(link);
  }

  modal.classList.add("active");
}

// Game functions
function updateCar() {
  if (!gameStarted) return;

  if (keys["w"] || keys["arrowup"]) {
    carSpeed = Math.min(carSpeed + acceleration, maxSpeed);
  } else if (keys["s"] || keys["arrowdown"]) {
    carSpeed = Math.max(carSpeed - acceleration, -maxSpeed * 0.5);
  } else {
    carSpeed *= 1 - deceleration;
  }

  if (keys["a"] || keys["arrowleft"] || joystickAngle < -0.2) {
    car.rotation.y += turnSpeed * Math.abs(carSpeed / maxSpeed);
  }
  if (keys["d"] || keys["arrowright"] || joystickAngle > 0.2) {
    car.rotation.y -= turnSpeed * Math.abs(carSpeed / maxSpeed);
  }

  // Apply joystick steering smoothly
  if (joystickAngle !== 0) {
    car.rotation.y -= joystickAngle * turnSpeed * Math.abs(carSpeed / maxSpeed);
  }

  const moveX = Math.sin(car.rotation.y) * carSpeed;
  const moveZ = Math.cos(car.rotation.y) * carSpeed;
  car.position.x += moveX;
  car.position.z += moveZ;

  const distFromCenter = Math.sqrt(car.position.x ** 2 + car.position.z ** 2);
  if (distFromCenter > trackOuterRadius - 5) {
    const angle = Math.atan2(car.position.z, car.position.x);
    car.position.x = Math.cos(angle) * (trackOuterRadius - 5);
    car.position.z = Math.sin(angle) * (trackOuterRadius - 5);
    carSpeed *= 0.5;
  }
  if (distFromCenter < trackInnerRadius + 5) {
    const angle = Math.atan2(car.position.z, car.position.x);
    car.position.x = Math.cos(angle) * (trackInnerRadius + 5);
    car.position.z = Math.sin(angle) * (trackInnerRadius + 5);
    carSpeed *= 0.5;
  }

  if (car.userData.wheels) {
    car.userData.wheels.forEach((wheel) => {
      wheel.rotation.x += carSpeed * 0.5;
    });
  }

  // Animate exhaust flames based on speed
  if (car.userData.exhaustFlames) {
    const speedRatio = Math.abs(carSpeed / maxSpeed);
    const time = Date.now() * 0.01;

    car.userData.exhaustFlames.forEach(
      ({ flame, innerFlame, exhaustLight }, index) => {
        // Flickering flame effect
        const flicker = 0.5 + Math.sin(time + index * 2) * 0.3;
        const scaleY = 0.3 + speedRatio * 1.5 + flicker * 0.3;
        flame.scale.y = scaleY;
        innerFlame.scale.y = scaleY * 0.8;

        // Opacity based on speed
        flame.material.opacity = 0.4 + speedRatio * 0.6;
        innerFlame.material.opacity = 0.5 + speedRatio * 0.5;

        // Light intensity flicker
        exhaustLight.intensity = 1 + speedRatio * 3 + flicker * 0.5;
      },
    );
  }

  updateLapProgress();

  // Create dust particles when moving fast
  if (Math.abs(carSpeed) > 0.15) {
    if (Math.random() < 0.3) {
      const dustPos = car.position.clone();
      dustPos.x += (Math.random() - 0.5) * 2;
      dustPos.z += (Math.random() - 0.5) * 2;
      createDustParticle(dustPos);
    }
  }

  // Create skid marks when turning hard at speed
  const isTurning =
    keys["a"] ||
    keys["d"] ||
    keys["arrowleft"] ||
    keys["arrowright"] ||
    Math.abs(joystickAngle) > 0.3;
  if (isTurning && Math.abs(carSpeed) > 0.2) {
    if (Math.random() < 0.5) {
      createSkidMark(car.position.clone());
    }
  }

  document.getElementById("speed").textContent = Math.abs(
    carSpeed * 100,
  ).toFixed(0);
  document.getElementById("collected").textContent = collectedCount;
  document.getElementById("total").textContent = totalShops;
  document.getElementById("lap").textContent = currentLap;
}

function updateLapProgress() {
  const angle = Math.atan2(car.position.z, car.position.x);
  const normalizedAngle = ((angle + Math.PI) / (2 * Math.PI)) * 100;
  document.getElementById("progress").textContent = normalizedAngle.toFixed(0);

  if (startAngle === null) {
    startAngle = angle;
  }

  const angleDiff = angle - startAngle;

  if (!crossedStart && Math.abs(angleDiff) > Math.PI) {
    crossedStart = true;
  }

  // Check if completed lap (crossed start line after going around) and collected all shops
  if (
    crossedStart &&
    Math.abs(angleDiff) < 0.3 &&
    collectedCount === totalShops &&
    currentLap === 0
  ) {
    currentLap = 1;
    crossedStart = false; // Prevent repeated triggers
    showVictory();
  }
}

function checkShopProximity() {
  nearShop = null;

  shopObjects.forEach((shop) => {
    if (shop.userData.collected) return;

    const distance = car.position.distanceTo(shop.position);

    if (distance < 10) {
      shop.userData.zone.material.opacity = 0.6;
      shop.userData.marker.material.emissiveIntensity = 2;
      nearShop = shop;
    } else {
      shop.userData.zone.material.opacity = 0.3;
      shop.userData.marker.material.emissiveIntensity = 1.5;
    }
  });

  if (nearShop) {
    nearShopIndicator.classList.add("active");
  } else {
    nearShopIndicator.classList.remove("active");
  }
}

function enterShop(shop) {
  shop.userData.collected = true;
  collectedCount++;

  // 🔊 SOUND: Shop collection sounds
  if (soundManager.isInitialized) {
    soundManager.playShopCollectionSounds();
  }

  // Confetti explosion
  createConfetti(shop.position.clone().add(new THREE.Vector3(0, 10, 0)));

  // Animate shopkeeper delivery
  animateShopkeeperDelivery(shop.userData.shopkeeper);

  // Visual feedback
  shop.userData.mainBuilding.material.emissive.setHex(0xffffff);
  shop.scale.set(1.2, 1.2, 1.2);

  setTimeout(() => {
    shop.userData.mainBuilding.material.emissive.setHex(0x0a0a0a);
  }, 1000);

  showShopModal(shop.userData);
}

function showShopModal(data) {
  const modal = document.getElementById("shop-modal");
  document.getElementById("modal-title").textContent = data.name;
  document.getElementById("modal-description").textContent = data.description;

  const linksDiv = document.getElementById("modal-links");
  linksDiv.innerHTML = "";

  if (data.github) {
    linksDiv.innerHTML += `<a href="${data.github}" target="_blank">🔗 View on GitHub</a>`;
  }
  if (data.link) {
    linksDiv.innerHTML += `<a href="${data.link}" target="_blank">📂 View Collection</a>`;
  }

  modal.classList.add("active");
  gameStarted = false;
}

window.closeShop = function () {
  document.getElementById("shop-modal").classList.remove("active");
  gameStarted = true;
};

// Race Again functionality
window.raceAgain = function () {
  location.reload(); // Simple page reload to restart
};

// Add event listener for race again button
document.addEventListener("DOMContentLoaded", () => {
  const raceAgainBtn = document.getElementById("race-again-button");
  if (raceAgainBtn) {
    raceAgainBtn.addEventListener("click", window.raceAgain);
  }
});

function showVictory() {
  victoryScreen.classList.add("active");
  victoryRacerName.textContent = `Congratulations, ${racerName}!`;

  // 🔊 SOUND: Victory celebration sequence
  if (soundManager.isInitialized) {
    soundManager.playVictorySequence();
  }

  // Create victory celebration
  createVictoryCelebration();

  // Massive confetti
  createConfetti(car.position.clone().add(new THREE.Vector3(0, 15, 0)));
}

function updateCamera() {
  // Only follow car if game has started, otherwise keep overview position
  if (!gameStarted) {
    return; // Keep initial camera position until race starts
  }

  if (cameraMode === "chase") {
    // Chase camera - behind the car
    const idealOffset = new THREE.Vector3(0, 8, -15);
    idealOffset.applyQuaternion(car.quaternion);
    idealOffset.add(car.position);

    const idealLookAt = new THREE.Vector3(0, 2, 10);
    idealLookAt.applyQuaternion(car.quaternion);
    idealLookAt.add(car.position);

    camera.position.lerp(idealOffset, 0.1);
    camera.lookAt(idealLookAt);
  } else if (cameraMode === "cockpit") {
    // Cockpit view - inside the car
    const cockpitOffset = new THREE.Vector3(0, 2, 1);
    cockpitOffset.applyQuaternion(car.quaternion);
    cockpitOffset.add(car.position);

    const cockpitLookAt = new THREE.Vector3(0, 2, 20);
    cockpitLookAt.applyQuaternion(car.quaternion);
    cockpitLookAt.add(car.position);

    camera.position.lerp(cockpitOffset, 0.15);
    camera.lookAt(cockpitLookAt);
  } else if (cameraMode === "top") {
    // Top-down view
    const topOffset = new THREE.Vector3(car.position.x, 50, car.position.z);
    camera.position.lerp(topOffset, 0.08);
    camera.lookAt(car.position.x, 0, car.position.z);
  }
}

// Mini-map
const miniMapCanvas = document.getElementById("mini-map");
const miniMapCtx = miniMapCanvas.getContext("2d");
miniMapCanvas.width = 200;
miniMapCanvas.height = 200;

function drawMiniMap() {
  const centerX = 100;
  const centerY = 100;
  const scale = 100 / trackOuterRadius;

  miniMapCtx.clearRect(0, 0, 200, 200);

  miniMapCtx.strokeStyle = "#00d4ff";
  miniMapCtx.lineWidth = 3;
  miniMapCtx.beginPath();
  miniMapCtx.arc(centerX, centerY, trackOuterRadius * scale, 0, Math.PI * 2);
  miniMapCtx.stroke();

  miniMapCtx.beginPath();
  miniMapCtx.arc(centerX, centerY, trackInnerRadius * scale, 0, Math.PI * 2);
  miniMapCtx.stroke();

  shopObjects.forEach((shop) => {
    const x = centerX + shop.position.x * scale;
    const y = centerY + shop.position.z * scale;
    miniMapCtx.fillStyle = shop.userData.collected ? "#00ff00" : "#ffffff";
    miniMapCtx.beginPath();
    miniMapCtx.arc(x, y, 4, 0, Math.PI * 2);
    miniMapCtx.fill();
  });

  const carX = centerX + car.position.x * scale;
  const carY = centerY + car.position.z * scale;
  miniMapCtx.fillStyle = "#e10600";
  miniMapCtx.beginPath();
  miniMapCtx.arc(carX, carY, 5, 0, Math.PI * 2);
  miniMapCtx.fill();
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  updateCar();
  updateCamera();
  checkShopProximity();
  drawMiniMap();
  animateAudience(); // RE-ENABLED!
  animateSkyText(); // Animate floating name and bio
  updateDustParticles(); // Dust effects
  updateSkidMarks(); // Tire marks

  // 🔊 SOUND: Update dynamic sounds based on car speed
  if (gameStarted && soundManager.isInitialized) {
    soundManager.updateEngineSound(carSpeed, maxSpeed);
    soundManager.updateWindSound(carSpeed, maxSpeed);
  }

  shopObjects.forEach((shop) => {
    const time = Date.now() * 0.001;
    const marker = shop.userData.marker;

    // Floating marker animation
    marker.position.y = 14 + Math.sin(time * 2) * 0.5;
    marker.rotation.y += 0.02;
    marker.rotation.x = Math.sin(time) * 0.3;

    // Rotate the ring around marker
    if (marker.userData.ring) {
      marker.userData.ring.rotation.z += 0.03;
      marker.userData.ring.position.y = 14 + Math.sin(time * 2) * 0.5;
    }

    // Animate particles (energy field)
    if (marker.userData.particles) {
      const positions =
        marker.userData.particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        // Spiral upward motion
        const idx = i / 3;
        positions[i + 1] += 0.05; // Move up

        // Reset when particle reaches top
        if (positions[i + 1] > 12) {
          const angle = Math.random() * Math.PI * 2;
          const radius = 3 + Math.random() * 3;
          positions[i] = Math.cos(angle) * radius;
          positions[i + 1] = 0;
          positions[i + 2] = Math.sin(angle) * radius;
        }

        // Rotate particles around Y axis
        const x = positions[i];
        const z = positions[i + 2];
        const currentAngle = Math.atan2(z, x);
        const currentRadius = Math.sqrt(x * x + z * z);
        const newAngle = currentAngle + 0.01;
        positions[i] = Math.cos(newAngle) * currentRadius;
        positions[i + 2] = Math.sin(newAngle) * currentRadius;
      }
      marker.userData.particles.geometry.attributes.position.needsUpdate = true;
    }

    // Make label always face camera
    if (shop.userData.label) {
      shop.userData.label.lookAt(camera.position);
    }
  });

  renderer.render(scene, camera);
}

animate();
