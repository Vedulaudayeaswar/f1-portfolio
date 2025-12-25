# 🏎️ Uday's F1 Portfolio Track

**Vedula Uday Easwar's Interactive Racing Portfolio**

An immersive Formula One-style racing game built with Three.js featuring a circular F1 track, racer name customization, and dynamic shop exploration. Drive through Uday's portfolio track and discover 10 innovative projects and achievements!

## 🎮 Enhanced Features

- **🏁 Circular F1 Track**: Realistic racing circuit with neon barriers and checkered finish line
- **👤 Racer Name System**: Personalized experience with custom racer names
- **🏪 Shop Buildings**: 10 colorful buildings representing projects and achievements
- **🗺️ Mini-Map**: Real-time tracking of your position and unexplored shops
- **🎬 Intro Animation**: Cinematic sequence from welcome screen to race start
- **💡 Neon Lighting**: Cyberpunk-inspired track lights alternating cyan and red
- **📊 Enhanced HUD**: Modern F1-style telemetry display with lap tracking
- **🎨 Futuristic UI**: Orbitron and Rajdhani fonts with gradient effects
- **⚡ Dynamic Camera**: Smooth third-person follow camera
- **🔊 Visual Feedback**: Glowing zones, floating markers, and shop interactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 🎯 How to Play

### Getting Started

1. **Enter Your Name**: Type your racer name on the welcome screen
2. **Watch the Intro**: Enjoy the cinematic animation sequence
3. **Drive**: Use controls to navigate the circular F1 track
4. **Explore Shops**: Drive near glowing buildings to trigger interaction zones
5. **Press SPACE**: Enter shops when the indicator appears
6. **Complete the Lap**: Visit all 10 shops and cross the checkered finish line!

### Controls

- **W / Arrow Up**: Accelerate forward
- **S / Arrow Down**: Brake/Reverse
- **A / Arrow Left**: Turn left
- **D / Arrow Right**: Turn right
- **SPACE**: Enter shop (when near)

### Objective

Race around the circular F1 track and visit all 10 shop buildings to explore Uday's portfolio. Each shop reveals detailed information about projects, certifications, or hackathon achievements. After collecting all shops, complete one full lap to trigger the victory screen!

## 🏪 Shops Featured

1. **🛒 Sparkathon - Walmart** - AI chatbot with virtual try-on features
2. **🧘 CodeCalm** - Mental wellness platform for developers
3. **🤖 AIDevs** - Automatic full-stack website builder
4. **📧 Cold Mail Generator** - AI-powered email outreach tool
5. **🎮 AI Dungeon Game** - Interactive AI storytelling adventure
6. **🤖 PatrolBot** - Autonomous navigation with SLAM capabilities
7. **🎬 MediaMosaic** - Comprehensive media management platform
8. **🦾 DH Parameters** - Robotics kinematics visualization
9. **📜 Certifications** - AI/ML/Deep Learning certification collection
10. **🏆 Hackathon Achievements** - HackRX 6.0 and ISRO collaborations

## 🛠️ Technologies Used

- **Three.js** - 3D graphics library
- **Vite** - Build tool and development server
- **JavaScript (ES6+)** - Core programming language
- **HTML5 & CSS3** - Structure and styling

## 🎨 Customization Ideas

### Enhance the Car Model

Replace the basic geometric car with a detailed GLTF model:

```javascript
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
loader.load("models/f1-car.gltf", (gltf) => {
  car = gltf.scene;
  scene.add(car);
});
```

### Add Sound Effects

```javascript
const listener = new THREE.AudioListener();
camera.add(listener);

const engineSound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load("sounds/engine.mp3", (buffer) => {
  engineSound.setBuffer(buffer);
  engineSound.setLoop(true);
  engineSound.play();
});
```

### Implement Physics

Use Cannon.js for realistic physics:

```bash
npm install cannon-es
```

## 📧 Contact

**Vedula Uday Easwar**

- Email: vedulaudayeaswar2004@gmail.com
- GitHub: [Vedulaudayeaswar](https://github.com/Vedulaudayeaswar)
- LinkedIn: [Uday Easwar](https://www.linkedin.com/in/uday-easwar-22290a27a/)

## 📝 License

MIT License - Feel free to use this as inspiration for your own portfolio!

## 🙏 Acknowledgments

Inspired by Bruno Simon's legendary [portfolio](https://bruno-simon.com) and the exciting world of Formula One racing.

---

**Made with ❤️ and Three.js**
