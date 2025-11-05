# Metin2 Analiz ve Mobil Oyun Projesi

Bu repository, **Metin2 2008 oyun dosyalarının detaylı analizi** ve **Metin2 Mobile oyununun React Native/Expo ile geliştirilmesi** çalışmalarını içermektedir.

## 📂 Proje Yapısı

### 1. METIN2_ANALIZ_RAPORU.md
Metin2 2008 oyununun kapsamlı teknik analiz raporu:
- Oyun mimarisi (Client-Server modeli)
- Dosya formatları (EPK, EIX, GR2)
- Server bileşenleri (Auth, DB, Game cores)
- 2008 dönemi oyun mekanikleri
- Razuning V5 Mainline Files analizi
- Geliştirme ortamı ve araçları

### 2. server-kurulumu-2025/
Metin2 server kurulum araçları koleksiyonu:
- `EPack32.7z` - EPK/EIX dosya yönetim araçları
- `Hash Generator - Tool.exe` - Hash/checksum generator
- `gr2_viewer_setup.exe` - GR2 3D model viewer
- `navicat9_premium_en_2.exe` - MySQL database yönetimi
- `putty.exe` - SSH/Telnet client
- `README.md` - Geliştirme araçları linkleri

### 3. metin2-mobile/
React Native ile geliştirilmiş Metin2 mobil oyunu:

#### ✨ Özellikler
- **Giriş Ekranı:** Karakter adı girişi ve animasyonlar
- **Krallık Seçimi:** 3 krallık (Shinsoo, Chunjo, Jinno)
- **Karakter Seçimi:** 4 sınıf (Warrior, Ninja, Sura, Shaman)
- **Oyun Ekranı:** Karakter bilgileri, stat'lar, hızlı aksiyonlar
- **State Management:** React Context API
- **Veri Saklama:** AsyncStorage ile kalıcı veri
- **Modern UI:** Gradient'ler, animasyonlar, responsive design

#### 🎮 Krallıklar
1. **Shinsoo (🐉 Mavi Ejderha)** - Bilgelik ve su krallığı
2. **Chunjo (🐯 Sarı Kaplan)** - Refah ve toprak krallığı
3. **Jinno (🔥 Kırmızı Anka)** - Ateş ve tutku krallığı

#### 🎭 Karakter Sınıfları
1. **Warrior (⚔️)** - Tank/DPS (STR: 90, VIT: 85)
2. **Ninja (🗡️)** - Assassin/Archer (DEX: 95)
3. **Sura (🔮)** - Magic/Melee Hybrid (INT: 80, STR: 75)
4. **Shaman (✨)** - Support/Healer (INT: 95)

#### 📱 Ekranlar
- `WelcomeScreen.js` - Karşılama ve giriş ekranı
- `KingdomSelectionScreen.js` - Krallık seçim ekranı
- `CharacterSelectionScreen.js` - Karakter seçim ekranı
- `GameScreen.js` - Ana oyun ekranı

#### 🏗️ Teknik Yapı
```
metin2-mobile/
├── src/
│   ├── screens/           # Oyun ekranları
│   ├── components/        # Yeniden kullanılabilir bileşenler
│   ├── navigation/        # React Navigation
│   ├── context/           # State management
│   ├── constants/         # Tema, oyun verileri
│   └── utils/             # Yardımcı fonksiyonlar
├── App.js                 # Ana giriş noktası
└── package.json
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v14+)
- npm veya yarn
- Expo CLI

### Mobil Oyunu Çalıştırma
```bash
cd metin2-mobile
npm install
npm start
```

**Platform seçenekleri:**
```bash
npm run android   # Android
npm run ios       # iOS (macOS gerekli)
npm run web       # Web browser
```

### QR Kod ile Test
1. Telefonunuza Expo Go uygulamasını yükleyin
2. Terminal'deki QR kodu tarayın
3. Oyun cihazınızda açılacak

## 📊 Proje İstatistikleri

### Analiz Raporu
- **Dosya:** METIN2_ANALIZ_RAPORU.md
- **Boyut:** ~20 KB
- **Bölümler:** 8 ana bölüm
- **Kapsam:** Oyun mimarisi, dosya formatları, geliştirme

### Mobil Oyun
- **Ekran Sayısı:** 4 ana ekran
- **Karakter Sayısı:** 4 sınıf
- **Krallık Sayısı:** 3 krallık
- **Toplam Kod:** ~2000+ satır
- **Bağımlılıklar:** 10+ npm paketi

## 🛠️ Kullanılan Teknolojiler

### Mobil Oyun
- **Framework:** React Native + Expo
- **Navigation:** React Navigation
- **State:** Context API + AsyncStorage
- **UI:** expo-linear-gradient, Animated API
- **Icons:** Emoji native support

### Analiz Araçları
- Python (EPack extraction)
- 7z compression
- Web scraping & research

## 📚 Dökümanlar

### Teknik Dökümanlar
- `METIN2_ANALIZ_RAPORU.md` - Tam teknik analiz
- `metin2-mobile/README_GAME.md` - Oyun geliştirici kılavuzu

### Kaynaklar
- [Metin2 Dev Wiki](https://metin2.dev/)
- [RewardMetin2 Wiki](https://rewardmetin2.altervista.org/)
- [Metin2Hub Forum](https://metin2hub.com/)

## 🎯 Gelecek Özellikler

### Oyun Geliştirme (Faz 2)
- [ ] Savaş sistemi
- [ ] Canavar AI
- [ ] Seviye atlama ve XP
- [ ] Envanter yönetimi
- [ ] Görev sistemi

### Gelişmiş Özellikler (Faz 3)
- [ ] Multiplayer desteği
- [ ] Gerçek zamanlı chat
- [ ] Lonca sistemi
- [ ] Ticaret sistemi
- [ ] PvP arena

## 📝 Notlar

### Güvenlik Uyarısı
- `server-kurulumu-2025/navicat9_premium_key.txt` açıkta lisans anahtarı içeriyor
- Production ortamında kaldırılmalı

### Performans
- Mobil oyun 60 FPS hedefliyor
- Animasyonlar React Native Animated API ile optimize
- State güncellemeleri minimal re-render için optimize

## 📄 Lisans
MIT License - Eğitim amaçlı kullanım için serbesttir.

## 🎮 Orijinal Oyun Hakkında
Metin2, Ymir Entertainment (şimdi Webzen) tarafından geliştirilmiştir.
Bu proje, eğitim amaçlı yapılmış bir fan adaptasyonudur.

## 📞 İletişim
Metin2 Mobile & Analiz Projesi - 2025

---

**Made with ❤️ by Claude Code Agent**
**Tarih:** 5 Kasım 2025
