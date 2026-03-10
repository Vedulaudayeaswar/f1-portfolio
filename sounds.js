import * as THREE from "three";

/**
 * Professional Sound Manager for F1 Racing Portfolio
 * Handles all audio: engine sounds, crowd ambient, victory celebrations, shopkeeper voices
 */
export class SoundManager {
  constructor(camera) {
    // Create audio listener (like a microphone attached to camera)
    this.listener = new THREE.AudioListener();
    camera.add(this.listener);

    // Audio loader
    this.audioLoader = new THREE.AudioLoader();

    // Sound objects
    this.sounds = {
      engine: null,
      crowdAmbient: null,
      victoryRoar: null,
      shopCollect: null,
      shopkeeperWelcome: null,
      shopkeeperDelivery: null,
      shopkeeperFarewell: null,
      victoryFanfare: null,
      confettiPop: null,
      windWhoosh: null,
      tireScreech: null,
    };

    // For generating placeholder sounds
    this.audioContext = this.listener.context;
    this.isInitialized = false;
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  /**
   * Initialize sound system with placeholder beeps
   * This creates simple synthesized sounds so the game works immediately
   * Users can replace with real sound files later
   */
  async initializePlaceholderSounds() {
    console.log("🔊 Initializing placeholder sounds...");

    // Create simple audio buffers for each sound type
    this.sounds.engine = this.createLoopingNoise(0.2);
    this.sounds.crowdAmbient = this.createLoopingNoise(0.1);
    this.sounds.windWhoosh = this.createLoopingNoise(0.15);

    // Simple beep sounds
    this.sounds.shopCollect = this.createBeepSound(880, 0.2);
    this.sounds.confettiPop = this.createBeepSound(1320, 0.1);
    this.sounds.shopkeeperWelcome = this.createBeepSound(440, 0.3);
    this.sounds.shopkeeperDelivery = this.createBeepSound(550, 0.3);
    this.sounds.shopkeeperFarewell = this.createBeepSound(660, 0.3);
    this.sounds.victoryRoar = this.createBeepSound(220, 0.5);
    this.sounds.victoryFanfare = this.createBeepSound(1760, 0.8);
    this.sounds.tireScreech = this.createBeepSound(800, 0.4);

    this.isInitialized = true;
    console.log(
      "✅ Placeholder sounds loaded! Replace with real audio files for better experience.",
    );

    return true;
  }

  /**
   * Load real sound files from /sounds/ directory
   * Falls back to placeholder sounds if files don't exist
   */
  async loadAllSounds() {
    console.log("🎵 Loading sound files...");

    // Use the custom audio.mpeg for engine and background music
    const soundFiles = {
      engine: "/sounds/audio.mpeg",
      crowdAmbient: "/sounds/audio.mpeg",
    };

    const loopingSounds = ["engine", "crowdAmbient"];

    // Load main audio files
    const loadPromises = Object.entries(soundFiles).map(([name, url]) =>
      this.loadSound(
        name,
        url,
        loopingSounds.includes(name),
        name === "engine" ? 0.4 : 0.25,
        false,
      ),
    );

    try {
      const results = await Promise.allSettled(loadPromises);
      const failedSounds = results.filter((r) => r.status === "rejected");

      if (failedSounds.length > 0) {
        console.warn(
          `⚠️ ${failedSounds.length} sound files missing, using placeholders`,
        );
        await this.initializePlaceholderSounds();
      } else {
        // Main sounds loaded, create placeholder for effects
        console.log("✅ Main audio loaded successfully!");

        // Create simple placeholder sounds for effects
        this.sounds.shopCollect = this.createBeepSound(880, 0.2);
        this.sounds.confettiPop = this.createBeepSound(1320, 0.1);
        this.sounds.shopkeeperWelcome = this.createBeepSound(440, 0.3);
        this.sounds.shopkeeperDelivery = this.createBeepSound(550, 0.3);
        this.sounds.shopkeeperFarewell = this.createBeepSound(660, 0.3);
        this.sounds.victoryRoar = this.createBeepSound(220, 0.5);
        this.sounds.victoryFanfare = this.createBeepSound(1760, 0.8);
        this.sounds.tireScreech = this.createBeepSound(800, 0.4);
        this.sounds.windWhoosh = this.createLoopingNoise(0.15);

        this.isInitialized = true;
        console.log("✅ All sounds ready!");
      }
    } catch (error) {
      console.warn("⚠️ Could not load sound files, using placeholders");
      await this.initializePlaceholderSounds();
    }
  }

  /**
   * Load individual sound file
   */
  loadSound(name, url, loop = false, volume = 0.5, positional = false) {
    return new Promise((resolve, reject) => {
      const sound = positional
        ? new THREE.PositionalAudio(this.listener)
        : new THREE.Audio(this.listener);

      this.audioLoader.load(
        url,
        (buffer) => {
          sound.setBuffer(buffer);
          sound.setLoop(loop);
          sound.setVolume(volume);
          this.sounds[name] = sound;
          resolve();
        },
        undefined,
        (error) => {
          console.warn(`Could not load: ${url}`);
          reject(error);
        },
      );
    });
  }

  /**
   * Create a simple beep sound using Web Audio API
   */
  createBeepSound(frequency = 440, duration = 0.2) {
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      // Sine wave with envelope
      const envelope = Math.max(0, 1 - i / length);
      data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3;
    }

    const sound = new THREE.Audio(this.listener);
    sound.setBuffer(buffer);
    sound.setVolume(0.5);

    return sound;
  }

  /**
   * Create looping noise for engine/crowd/wind
   */
  createLoopingNoise(baseVolume = 0.2) {
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * 2; // 2 second loop
    const buffer = this.audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    // Generate filtered noise
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * baseVolume;
    }

    const sound = new THREE.Audio(this.listener);
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(baseVolume);

    return sound;
  }

  /**
   * Play a sound
   */
  play(soundName) {
    if (!this.isInitialized) {
      console.warn("⚠️ Sounds not initialized yet");
      return;
    }

    const sound = this.sounds[soundName];
    if (!sound) {
      console.warn(`⚠️ Sound "${soundName}" not found`);
      return;
    }

    // Resume audio context on mobile (iOS requirement)
    if (this.listener.context.state === "suspended") {
      this.listener.context.resume();
    }

    if (!sound.isPlaying) {
      sound.play();
    }
  }

  /**
   * Stop a sound
   */
  stop(soundName) {
    const sound = this.sounds[soundName];
    if (sound && sound.isPlaying) {
      sound.stop();
    }
  }

  /**
   * Set volume for a specific sound
   */
  setVolume(soundName, volume) {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.setVolume(Math.max(0, Math.min(1, volume)));
    }
  }

  /**
   * Update engine sound based on car speed (pitch and volume shift)
   */
  updateEngineSound(speed, maxSpeed) {
    const sound = this.sounds.engine;
    if (!sound || !sound.isPlaying) return;

    const normalizedSpeed = Math.abs(speed) / maxSpeed;

    // Change playback rate (pitch shift: 0.5x to 2.0x)
    const playbackRate = 0.5 + normalizedSpeed * 1.5;
    sound.setPlaybackRate(playbackRate);

    // Volume increases with speed
    const volume = 0.15 + normalizedSpeed * 0.25;
    sound.setVolume(volume);
  }

  /**
   * Update wind whoosh based on speed
   */
  updateWindSound(speed, maxSpeed) {
    const sound = this.sounds.windWhoosh;
    if (!sound) return;

    const normalizedSpeed = Math.abs(speed) / maxSpeed;

    // Only play wind at high speeds
    if (normalizedSpeed > 0.6 && !sound.isPlaying) {
      sound.play();
    } else if (normalizedSpeed <= 0.6 && sound.isPlaying) {
      sound.stop();
    }

    if (sound.isPlaying) {
      sound.setVolume(normalizedSpeed * 0.3);
    }
  }

  /**
   * Play random shopkeeper voice
   */
  playShopkeeperVoice(type = "welcome") {
    const voiceMap = {
      welcome: "shopkeeperWelcome",
      delivery: "shopkeeperDelivery",
      farewell: "shopkeeperFarewell",
    };

    const soundName = voiceMap[type];
    if (soundName) {
      this.play(soundName);
    }
  }

  /**
   * Play victory sequence (roar + fanfare)
   */
  playVictorySequence() {
    this.stop("engine");
    this.stop("windWhoosh");

    this.play("victoryRoar");

    setTimeout(() => {
      this.play("victoryFanfare");
    }, 1000);
  }

  /**
   * Play shop collection sounds
   */
  playShopCollectionSounds() {
    this.play("shopCollect");

    setTimeout(() => {
      this.play("confettiPop");
    }, 100);

    setTimeout(() => {
      this.playShopkeeperVoice("welcome");
    }, 500);

    setTimeout(() => {
      this.playShopkeeperVoice("delivery");
    }, 1500);
  }

  /**
   * Stop all sounds
   */
  stopAll() {
    Object.keys(this.sounds).forEach((name) => this.stop(name));
  }
}
