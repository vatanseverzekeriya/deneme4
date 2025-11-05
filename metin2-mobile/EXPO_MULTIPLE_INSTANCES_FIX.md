# Expo Çoklu Instance Sorunu - Çözüm Kılavuzu

## 🎯 Sorun Nedir?

Expo development server'ı aynı anda birden fazla terminal penceresinden başlatıldığında, aşağıdaki sorunlar oluşur:

### Sorun Belirtileri

1. **Port Çakışmaları:**
   ```
   Error: listen EADDRINUSE: address already in use :::8081
   Error: listen EADDRINUSE: address already in use :::8082
   ```

2. **Çoklu QR Kodlar:**
   - İlk instance: `exp://192.168.1.36:8081`
   - İkinci instance: `exp://192.168.1.36:8082`
   - Hangi QR kodun kullanılacağı belirsiz

3. **Performans Sorunları:**
   - Her iki instance da kaynak tüketir
   - Metro bundler birden fazla kez çalışır
   - Gereksiz CPU ve RAM kullanımı

---

## ✅ Çözüm

Bu proje için özel script'ler oluşturulmuştur:

### 1. Otomatik Port ve Process Yönetimi
### 2. Kullanıcı Dostu Arayüz
### 3. Platform Bağımsız (Windows, Linux, Mac)

---

## 🚀 Hızlı Başlangıç

### Windows (PowerShell)

```powershell
# Proje dizinine git
cd metin2-mobile

# Expo'yu güvenli bir şekilde başlat
.\scripts\start-expo.ps1
```

### Linux/Mac (Bash)

```bash
# Proje dizinine git
cd metin2-mobile

# Expo'yu güvenli bir şekilde başlat
./scripts/start-expo.sh
```

---

## 📋 Script Kullanım Detayları

### Expo Başlatma Script'i

**Windows:**
```powershell
.\scripts\start-expo.ps1
```

**Linux/Mac:**
```bash
./scripts/start-expo.sh
```

**Özellikler:**
- ✅ Mevcut process'leri otomatik tespit eder
- ✅ Port çakışmalarını önler
- ✅ Kullanıcıdan onay alarak eski process'leri temizler
- ✅ node_modules yoksa otomatik yükler
- ✅ Cache temizleme seçeneği sunar

**Örnek Çıktı:**
```
==================================
Expo Development Server Başlatıcı
==================================

Port kontrolü yapılıyor...

⚠️  Aşağıdaki Expo/Metro process'leri bulundu:

Port       PID        ProcessName
----       ---        -----------
8081       13268      node
8082       7124       node

Bu process'leri durdurmak istiyor musunuz? (E/H): E

Process'ler durduruluyor...
✓ Port 8081 - PID 13268 durduruldu
✓ Port 8082 - PID 7124 durduruldu

Process'lerin kapanması bekleniyor...

Proje dizini: C:\Users\...\metin2-mobile

Expo cache'ini temizlemek istiyor musunuz? (E/H) [Varsayılan: H]: H

==================================
Expo Development Server Başlatılıyor...
==================================

Expo başlatılıyor...
```

---

### Expo Durdurma Script'i

**Windows:**
```powershell
.\scripts\stop-expo.ps1
```

**Linux/Mac:**
```bash
./scripts/stop-expo.sh
```

**Özellikler:**
- ✅ Tüm Expo/Metro process'lerini bulur
- ✅ Process detaylarını gösterir (Port, PID, Process Adı, Başlangıç Zamanı)
- ✅ Kullanıcıdan onay alarak durdurur
- ✅ Başarı/başarısızlık özeti sunar

**Örnek Çıktı:**
```
==================================
Expo Development Server Durdurucu
==================================

Expo/Metro process'leri aranıyor...

Bulunan process'ler:

Port       PID        ProcessName          StartTime
----       ---        -----------          ---------
8081       13268      node                 6.11.2025 01:09:11

Bu process'leri durdurmak istiyor musunuz? (E/H): E

Process'ler durduruluyor...

✓ Port 8081 - PID 13268 (node) durduruldu

==================================
Özet:
==================================
✓ Başarılı: 1
✗ Başarısız: 0

Portlar temizlendi. Artık Expo'yu yeniden başlatabilirsiniz.
```

---

## 🔧 NPM Script'leri

Package.json'a aşağıdaki komutlar eklenmiştir:

### Yardımcı Komutlar

```bash
# Güvenli başlatma rehberini göster
npm run start:safe

# Durdurma rehberini göster
npm run stop
```

**Not:** Bu komutlar sadece script'lerin yolunu gösterir, çalıştırmazlar. Script'leri doğrudan yukarıdaki örneklerdeki gibi çalıştırın.

---

## 📚 Detaylı Dokümantasyon

Daha detaylı bilgi için:

```bash
cat scripts/README.md
```

Veya dosyayı bir metin editöründe açın:
- **Windows:** `scripts/README.md`
- **Linux/Mac:** `scripts/README.md`

---

## 🛠️ Sorun Giderme

### 1. PowerShell Script Çalışmıyor

**Hata:**
```
.\start-expo.ps1 : File cannot be loaded because running scripts is disabled on this system.
```

**Çözüm:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### 2. Bash Script İzni Yok

**Hata:**
```
bash: ./start-expo.sh: Permission denied
```

**Çözüm:**
```bash
chmod +x scripts/*.sh
```

---

### 3. Port Hala Kullanımda

**Hata:**
```
Error: listen EADDRINUSE: address already in use :::8081
```

**Çözüm:**

**Windows (PowerShell):**
```powershell
# Port 8081'i kullanan process'i bul
netstat -ano | findstr :8081

# Process'i durdur (PID'yi yukarıdaki çıktıdan alın)
Stop-Process -Id <PID> -Force
```

**Linux/Mac:**
```bash
# Port 8081'i kullanan process'i bul ve durdur
lsof -ti:8081 | xargs kill -9
```

**Veya durdurma script'ini kullanın:**
```bash
# Windows
.\scripts\stop-expo.ps1

# Linux/Mac
./scripts/stop-expo.sh
```

---

### 4. node_modules Bulunamadı

Script otomatik olarak `npm install` çalıştırır. Manuel olarak çalıştırmak isterseniz:

```bash
cd metin2-mobile
npm install
```

---

### 5. React Native Screens Versiyon Uyarısı

**Uyarı:**
```
react-native-screens@4.18.0 - expected version: ~4.16.0
```

**Çözüm:**
Package.json'da versiyon zaten düzeltildi. Bağımlılıkları güncelleyin:

```bash
cd metin2-mobile
npm install
```

---

## 📊 Kontrol Edilen Portlar

Script'ler aşağıdaki portları kontrol eder:

| Port  | Kullanım                           |
|-------|-----------------------------------|
| 8081  | Metro Bundler ana portu           |
| 8082  | Metro Bundler alternatif portu    |
| 19000 | Expo DevTools portu               |
| 19001 | Expo Dev Server portu             |
| 19002 | Expo Dev Server WebSocket portu   |

---

## 💡 İpuçları

### 1. Her Zaman Script'leri Kullanın

❌ **Doğrudan kullanmayın:**
```bash
npm start
expo start
npx expo start
```

✅ **Script'leri kullanın:**
```bash
# Windows
.\scripts\start-expo.ps1

# Linux/Mac
./scripts/start-expo.sh
```

---

### 2. Cache Temizleme

Garip hatalar veya eski kod çalışıyorsa, cache'i temizleyin:

Script başlatılırken sorulduğunda **E** seçeneğini seçin:
```
Expo cache'ini temizlemek istiyor musunuz? (E/H) [Varsayılan: H]: E
```

---

### 3. Process'leri Düzenli Kontrol Edin

Geliştirme oturumunu kapatmadan önce process'leri durdurun:

```bash
# Windows
.\scripts\stop-expo.ps1

# Linux/Mac
./scripts/stop-expo.sh
```

---

## 🎓 En İyi Uygulamalar

1. **Tek Terminal Kullanın:**
   - Expo'yu sadece bir terminal penceresinde çalıştırın
   - Birden fazla pencerede başlatmaktan kaçının

2. **Script'leri Tercih Edin:**
   - Manuel `expo start` yerine script'leri kullanın
   - Otomatik port kontrolü ve temizlik avantajı

3. **Düzenli Temizlik:**
   - Geliştirme oturumu sonunda process'leri durdurun
   - Gereksiz kaynak kullanımını önleyin

4. **Cache Yönetimi:**
   - Sorun yaşadığınızda cache'i temizleyin
   - Düzenli temizlik performansı artırır

---

## 📞 Destek

Sorun yaşamaya devam ederseniz:

1. **Port Durumunu Kontrol Edin:**
   ```bash
   # Windows
   netstat -ano | findstr :808

   # Linux/Mac
   lsof -i :8081
   lsof -i :8082
   ```

2. **Node.js Process'lerini Kontrol Edin:**
   ```bash
   # Windows
   Get-Process node

   # Linux/Mac
   ps aux | grep node
   ```

3. **Expo Loglarını İnceleyin:**
   Terminal çıktılarında hata mesajlarını arayın

4. **README'yi Okuyun:**
   ```bash
   cat scripts/README.md
   ```

---

## 📝 Versiyon Notları

### v1.0.0 (6 Kasım 2025)

**Düzeltmeler:**
- ✅ Çoklu instance sorunu çözüldü
- ✅ Port yönetimi otomasyonu eklendi
- ✅ React Native Screens versiyonu düzeltildi (~4.16.0)

**Yeni Özellikler:**
- ✅ Windows (PowerShell) script'leri
- ✅ Linux/Mac (Bash) script'leri
- ✅ Otomatik port kontrolü
- ✅ Process yönetimi
- ✅ Cache temizleme seçeneği
- ✅ Kullanıcı dostu arayüz

---

## 📄 Lisans

Bu proje lisansı altında lisanslanmıştır.

---

**Son Güncelleme:** 6 Kasım 2025
**Hazırlayan:** Claude Code Assistant
