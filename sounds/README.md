# Sounds Directory

This folder contains audio files for the F1 Racing Portfolio.

## 🎵 How to Add Real Sound Files

### Option 1: Download Free Sounds

1. **Freesound.org** (Best Quality):

   - F1 Engine: https://freesound.org/search/?q=formula+1+engine
   - Crowd: https://freesound.org/search/?q=stadium+crowd
   - Victory: https://freesound.org/search/?q=victory+fanfare

2. **OpenGameArt.org** (Game-Ready):

   - Racing sounds: https://opengameart.org/art-search?keys=race+car

3. **Pixabay** (No Attribution):

   - Racing sounds: https://pixabay.com/sound-effects/search/racing/

4. **Kenney.nl** (Free Pack):
   - Racing Pack: https://kenney.nl/assets/racing-pack

### Option 2: Use AI to Generate

**ElevenLabs** (Voice Generation):

- Generate shopkeeper voices with different accents and personalities

**Suno AI / Udio** (Music):

- Generate victory fanfare and background music

### Required Files:

```
sounds/
├── engine.ogg                  (Looping F1 engine sound)
├── crowd-ambient.ogg          (Looping stadium crowd noise)
├── victory-roar.ogg           (Crowd cheering)
├── shop-collect.ogg           (Success beep/chime)
├── shopkeeper-welcome.ogg     (Voice: "Welcome to our shop!")
├── shopkeeper-delivery.ogg    (Voice: "Here's your project!")
├── shopkeeper-farewell.ogg    (Voice: "Thanks for visiting!")
├── victory-fanfare.ogg        (Triumphant music)
├── confetti-pop.ogg           (Pop/burst sound)
├── wind-whoosh.ogg            (Looping wind sound)
└── tire-screech.ogg           (Brake/drift sound)
```

## 🔧 Converting Audio Files

### Using Audacity (Free):

1. Download: https://www.audacityteam.org
2. Open your MP3/WAV file
3. File → Export → Export as OGG
4. Quality: 5-7
5. Save to this `sounds/` folder

### Using Online Converter:

- CloudConvert: https://cloudconvert.com/mp3-to-ogg
- Online-Convert: https://audio.online-convert.com/convert-to-ogg

## 📝 Current Status

**The game currently uses placeholder beep sounds** generated with Web Audio API.

When you add real .ogg files to this directory, the sound system will automatically load them instead of the placeholders.

No code changes needed - just drop the files here!
