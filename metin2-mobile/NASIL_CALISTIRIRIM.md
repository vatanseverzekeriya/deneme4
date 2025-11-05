# 📱 Metin2 Mobile - Nasıl Çalıştırırım?

## 🎯 QR Kodu Tarama Rehberi

### Yöntem 1: Kendi Bilgisayarınızda Çalıştırma (Önerilen)

#### Adım 1: Projeyi İndirin
```bash
git clone https://github.com/vatanseverzekeriya/deneme4.git
cd deneme4/metin2-mobile
```

#### Adım 2: Bağımlılıkları Yükleyin
```bash
npm install
```

#### Adım 3: Expo'yu Başlatın
```bash
npm start
```

Bu komutu çalıştırdığınızda terminal'de **QR kod** görünecektir! 📱

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   █▀▀▀▀▀█ ▄ █  ▄█▀ ▄▀▄█▀ █▀▀▀▀▀█                           │
│   █ ███ █ ▀█▄▀█▄▀█ █▄▄█  █ ███ █                           │
│   █ ▀▀▀ █ ██▄▀█ ▀▄█  ▄   █ ▀▀▀ █                           │
│   ▀▀▀▀▀▀▀ ▀ █ █▄█ ▀ █ ▀ ▀ ▀▀▀▀▀▀▀                           │
│   ...QR KOD BURAYA GELİR...                                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

#### Adım 4: QR Kodu Tarayın

**Telefonunuzda:**
1. **App Store** (iOS) veya **Google Play** (Android)'den **Expo Go** uygulamasını indirin
2. Expo Go'yu açın
3. "Scan QR Code" butonuna basın
4. Terminal'deki QR kodu tarayın
5. Oyun telefonunuzda açılacak! 🎮

---

## 🌐 Alternatif: Web Tarayıcıda Test

QR kod olmadan web'de test etmek için:

```bash
cd metin2-mobile
npm run web
```

Tarayıcınızda otomatik açılacak: `http://localhost:19006`

---

## 📱 Platform-Specific Komutlar

### Android Emulator
```bash
npm run android
```
**Gereksinim:** Android Studio ve emulator kurulu olmalı

### iOS Simulator (Sadece macOS)
```bash
npm run ios
```
**Gereksinim:** Xcode kurulu olmalı

---

## 🔍 QR Kod Nerede Görünür?

### Terminal Çıktısı Örneği:
```
Starting project at /path/to/metin2-mobile

› Metro waiting on exp://192.168.1.100:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Using Expo Go
› Press s │ switch to development build

› Press a │ open Android
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› Press o │ open project code in your editor

› Press ? │ show all commands

Logs for your project will appear below. Press Ctrl+C to exit.
```

QR kod bu mesajın **üstünde** ASCII art olarak görünecek!

---

## 🎨 Expo Go Uygulaması Nasıl Kullanılır?

### iOS (iPhone/iPad):
1. **App Store** > "Expo Go" ara > İndir
2. Uygulamayı aç
3. "Scan QR Code" tab'ine tıkla
4. Kamerayı QR koda tut
5. Otomatik olarak uygulama yüklenecek

### Android:
1. **Google Play Store** > "Expo Go" ara > İndir
2. Uygulamayı aç
3. "Scan QR Code" butonuna bas
4. Kamerayı QR koda tut
5. Otomatik olarak uygulama yüklenecek

---

## 🚨 Sorun Giderme

### QR Kod Görünmüyor
**Çözüm 1:** Terminal penceresini genişletin
```bash
# Terminal'i tam ekran yapın
```

**Çözüm 2:** URL ile manuel bağlantı
```bash
# Terminal'de exp:// ile başlayan URL'yi arayın
exp://192.168.1.100:19000

# Bu URL'yi Expo Go'da manuel olarak girebilirsiniz
```

### "Network Error" Hatası
**Çözüm:** Telefon ve bilgisayar aynı WiFi ağında olmalı!
- Bilgisayar: WiFi'ye bağlı
- Telefon: Aynı WiFi ağına bağlı
- VPN kapalı olmalı

### Port Kullanımda
```bash
# Farklı port kullan
npx expo start --port 19001
```

### Metro Bundler Hatası
```bash
# Cache'i temizle ve yeniden başlat
npx expo start -c
```

---

## 🎮 Oyunu Test Etme Adımları

1. **Expo Go ile oyunu açın**
2. **Welcome Screen** - Karakter adınızı girin (min 3 karakter)
3. **Kingdom Selection** - Bir krallık seçin:
   - 🐉 Shinsoo (Mavi)
   - 🐯 Chunjo (Sarı)
   - 🔥 Jinno (Kırmızı)
4. **Character Selection** - Bir sınıf seçin:
   - ⚔️ Warrior
   - 🗡️ Ninja
   - 🔮 Sura
   - ✨ Shaman
5. **Game Screen** - Ana oyun ekranını keşfedin!

---

## 📊 Sistem Gereksinimleri

### Geliştirme (Bilgisayar):
- **Node.js:** v14 veya üzeri
- **npm:** v6 veya üzeri
- **RAM:** En az 4 GB
- **Disk:** 500 MB boş alan

### Oyun (Mobil):
- **iOS:** 11.0 veya üzeri
- **Android:** 5.0 (Lollipop) veya üzeri
- **RAM:** En az 2 GB
- **Expo Go:** Son versiyon

---

## 🎯 Hızlı Başlangıç (TL;DR)

```bash
# 1. Projeye git
cd metin2-mobile

# 2. Başlat
npm start

# 3. Telefonunuzda Expo Go'yu açın
# 4. QR'ı tarayın
# 5. Oyna! 🎮
```

---

## 🔗 Yararlı Linkler

- **Expo Go İndir (iOS):** https://apps.apple.com/app/expo-go/id982107779
- **Expo Go İndir (Android):** https://play.google.com/store/apps/details?id=host.exp.exponent
- **Expo Dokümantasyon:** https://docs.expo.dev/
- **React Native Dokümantasyon:** https://reactnative.dev/

---

## 💡 İpuçları

1. **Hot Reload:** Kod değiştirdiğinizde otomatik yenilenir
2. **Shake:** Telefonu sallayarak developer menu açılır
3. **Debug:** Chrome DevTools ile debug edebilirsiniz (j tuşu)
4. **Screenshot:** Oyun içi screenshot alabilirsiniz

---

## 🎉 İyi Oyunlar!

Artık Metin2 Mobile'ı telefonunuzda oynamaya hazırsınız!

Sorularınız için:
- GitHub Issues açabilirsiniz
- README.md dosyasına bakabilirsiniz

**Ejderha Taşları için savaş başlasın!** ⚔️🐉✨
