# Metin2 Mobile - React Native Game

A mobile adaptation of the classic MMORPG Metin2, built with React Native and Expo.

## 🎮 Features

### Implemented
- ✅ Welcome Screen with player name input
- ✅ Kingdom Selection (3 kingdoms: Shinsoo, Chunjo, Jinno)
- ✅ Character Selection (4 classes: Warrior, Ninja, Sura, Shaman)
- ✅ Game Screen with character stats and quick actions
- ✅ State Management with Context API
- ✅ Data Persistence with AsyncStorage
- ✅ Beautiful UI with gradients and animations

### Coming Soon
- 🔄 Combat System
- 🔄 Inventory Management
- 🔄 Quest System
- 🔄 Guild System
- 🔄 Multiplayer Features
- 🔄 Item Shop
- 🔄 Level Progression
- 🔄 PvP Arena

## 📁 Project Structure

```
metin2-mobile/
├── src/
│   ├── screens/              # All game screens
│   │   ├── WelcomeScreen.js
│   │   ├── KingdomSelectionScreen.js
│   │   ├── CharacterSelectionScreen.js
│   │   └── GameScreen.js
│   ├── components/           # Reusable components
│   ├── navigation/           # Navigation setup
│   │   └── AppNavigator.js
│   ├── context/              # State management
│   │   └── GameContext.js
│   ├── constants/            # Constants and config
│   │   ├── theme.js          # Colors, fonts, sizes
│   │   └── game.js           # Game data (kingdoms, characters)
│   ├── assets/               # Images, fonts, etc.
│   └── utils/                # Helper functions
├── App.js                    # Main app entry
└── package.json

```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Navigate to the project directory:
```bash
cd metin2-mobile
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

### Scan QR Code
- Install Expo Go app on your phone
- Scan the QR code from the terminal
- The app will load on your device

## 🎨 Design System

### Colors
- **Primary:** Gold (#D4AF37) - Main accent color
- **Kingdoms:**
  - Shinsoo (Blue): #3B82F6
  - Chunjo (Yellow): #EAB308
  - Jinno (Red): #EF4444
- **Background:** Dark theme (#0A0A0F)

### Typography
- Title: 32px, ExtraBold
- Heading: 24-28px, Bold
- Body: 14px, Regular
- Small: 12px, Regular

## 🎭 Game Mechanics

### Kingdoms
1. **Shinsoo (Blue Dragon Kingdom)**
   - Kingdom of wisdom and water
   - Available classes: Ninja, Shaman

2. **Chunjo (Yellow Tiger Kingdom)**
   - Kingdom of prosperity and earth
   - Available classes: Warrior, Sura

3. **Jinno (Red Phoenix Kingdom)**
   - Kingdom of fire and passion
   - Available classes: All

### Character Classes

1. **Warrior ⚔️**
   - Role: Tank/DPS
   - High: Strength (90), Vitality (85)
   - Paths: Body Warrior, Mental Warrior

2. **Ninja 🗡️**
   - Role: Assassin/Archer
   - High: Dexterity (95)
   - Paths: Assassin, Archer

3. **Sura 🔮**
   - Role: Magic/Melee Hybrid
   - High: Intelligence (80), Strength (75)
   - Paths: Black Magic, Weaponary

4. **Shaman ✨**
   - Role: Support/Healer
   - High: Intelligence (95)
   - Paths: Dragon Shaman, Healing Shaman

### Stats
- **Strength (STR):** Physical damage
- **Intelligence (INT):** Magic damage and mana
- **Dexterity (DEX):** Critical chance and evasion
- **Vitality (VIT):** HP and defense

## 📱 Screens

### 1. Welcome Screen
- Enter character name (3-12 characters)
- New game / Continue / Settings options
- Animated logo and background

### 2. Kingdom Selection
- Choose from 3 kingdoms
- View kingdom descriptions
- Animated card selection

### 3. Character Selection
- Choose from 4 character classes
- View detailed stats and abilities
- See specialization paths
- Animated stat bars

### 4. Game Screen
- Character overview with stats
- Quick actions (Hunt, Explore, Quests, Shop)
- Game features (Inventory, Guild, Achievements)
- Menu with settings and logout

## 🔧 Technical Details

### State Management
- React Context API for global state
- AsyncStorage for data persistence
- Auto-save on important actions

### Navigation
- React Navigation Stack Navigator
- Custom transitions and animations
- Deep linking support ready

### Animations
- React Native Animated API
- Spring animations for interactions
- Fade and scale transitions

### Performance
- Optimized re-renders with useMemo/useCallback
- Lazy loading for heavy components
- Image optimization ready

## 📦 Dependencies

```json
{
  "@react-navigation/native": "^7.1.19",
  "@react-navigation/stack": "^7.6.2",
  "@react-native-async-storage/async-storage": "^2.2.0",
  "expo": "~54.0.22",
  "expo-linear-gradient": "^15.0.7",
  "expo-font": "^14.0.9",
  "react-native-screens": "^4.18.0",
  "react-native-safe-area-context": "^5.6.2"
}
```

## 🎯 Roadmap

### Phase 1 (Current) ✅
- Basic UI/UX implementation
- Character creation flow
- State management setup

### Phase 2 (Next)
- Combat system
- Monster AI
- Experience and leveling
- Item system

### Phase 3
- Multiplayer features
- Real-time chat
- Guild system
- Trading system

### Phase 4
- Advanced features
- Dungeons and raids
- PvP arena
- Crafting system

## 🐛 Known Issues
- None yet! Fresh codebase 🎉

## 🤝 Contributing
This is a demo/educational project. Feel free to fork and experiment!

## 📄 License
MIT License - Feel free to use this code for learning purposes.

## 🎮 Original Game
Metin2 is originally developed by Ymir Entertainment (now Webzen).
This is a fan-made mobile adaptation for educational purposes only.

## 📞 Contact
Created for the Metin2 Mobile project - 2025

---

**Made with ❤️ and React Native**
