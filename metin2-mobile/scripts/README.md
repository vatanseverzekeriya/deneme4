# Expo Development Server Yönetim Script'leri

Bu dizinde, Expo development server'ı başlatmak ve durdurmak için yardımcı script'ler bulunmaktadır. Bu script'ler, çoklu instance sorununu önlemek ve port çakışmalarını yönetmek için tasarlanmıştır.

## 📋 İçindekiler

- [Sorun](#sorun)
- [Çözüm](#çözüm)
- [Script'ler](#scriptler)
- [Kullanım](#kullanım)
- [Özellikler](#özellikler)

---

## ⚠️ Sorun

Expo development server'ı aynı anda birden fazla terminal penceresinden başlatıldığında, çoklu instance sorunu oluşur:

1. **İlk instance** varsayılan port 8081'i kullanır
2. **İkinci instance** port 8081 meşgul olduğu için 8082'ye yönlendirilir
3. Her iki instance da arka planda çalışmaya devam eder
4. Kullanıcı hangi QR kodunu kullanacağını bilemez
5. Port çakışmaları ve `EADDRINUSE` hataları oluşur

---

## ✅ Çözüm

Bu script'ler şu işlemleri otomatik olarak yapar:

1. **Port Kontrolü:** 8081, 8082 ve diğer Expo portlarını kontrol eder
2. **Process Tespiti:** Mevcut Expo/Metro process'lerini tespit eder
3. **Kullanıcı Onayı:** Process'leri durdurmak için kullanıcıdan onay alır
4. **Temizleme:** Eski process'leri güvenli bir şekilde durdurur
5. **Temiz Başlatma:** Yeni bir Expo instance'ı başlatır

---

## 📦 Script'ler

### Windows (PowerShell)

- **`start-expo.ps1`** - Expo development server'ı başlatır
- **`stop-expo.ps1`** - Çalışan Expo process'lerini durdurur

### Linux/Mac (Bash)

- **`start-expo.sh`** - Expo development server'ı başlatır
- **`stop-expo.sh`** - Çalışan Expo process'lerini durdurur

---

## 🚀 Kullanım

### Windows (PowerShell)

#### Expo'yu Başlatma

```powershell
# Proje kök dizininde
.\scripts\start-expo.ps1
```

#### Expo'yu Durdurma

```powershell
# Proje kök dizininde
.\scripts\stop-expo.ps1
```

**Not:** PowerShell execution policy hatası alırsanız:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### Linux/Mac (Bash)

#### Expo'yu Başlatma

```bash
# Proje kök dizininde
./scripts/start-expo.sh
```

#### Expo'yu Durdurma

```bash
# Proje kök dizininde
./scripts/stop-expo.sh
```

**Not:** Eğer "Permission denied" hatası alırsanız:

```bash
chmod +x scripts/*.sh
```

---

## ✨ Özellikler

### `start-expo.ps1` / `start-expo.sh`

- ✅ Port 8081, 8082, 19000, 19001, 19002'yi kontrol eder
- ✅ Mevcut Expo/Metro process'lerini tespit eder
- ✅ Process bilgilerini (Port, PID, Process Adı) gösterir
- ✅ Kullanıcıdan onay alarak eski process'leri durdurur
- ✅ node_modules yoksa otomatik olarak `npm install` çalıştırır
- ✅ Expo cache'ini temizleme seçeneği sunar
- ✅ Renkli ve kullanıcı dostu terminal çıktısı
- ✅ Hata durumlarını yönetir

### `stop-expo.ps1` / `stop-expo.sh`

- ✅ Tüm Expo/Metro portlarını tarar
- ✅ Çalışan process'leri listeler
- ✅ Process bilgilerini (Port, PID, Process Adı, Başlangıç Zamanı) gösterir
- ✅ Kullanıcıdan onay alarak process'leri durdurur
- ✅ Başarı/başarısızlık özeti gösterir
- ✅ Renkli ve kullanıcı dostu terminal çıktısı

---

## 📝 İş Akışı Örnekleri

### Senaryo 1: Normal Başlatma

```bash
# 1. Script'i çalıştır
./scripts/start-expo.sh

# 2. Port kontrolü yapılır
# 3. Hiçbir process bulunamaz
# 4. Expo başlatılır
# 5. QR kodu tarayın ve geliştirmeye başlayın
```

### Senaryo 2: Mevcut Process'ler Var

```bash
# 1. Script'i çalıştır
./scripts/start-expo.sh

# 2. Port kontrolü yapılır
# 3. Mevcut process'ler listelenir:
#    Port       PID        Process
#    ----       ---        -------
#    8081       12345      node
#    8082       67890      node

# 4. Kullanıcıya sorulur: "Bu process'leri durdurmak istiyor musunuz? (E/H)"
# 5. E seçilirse process'ler durdurulur
# 6. Yeni Expo instance'ı başlatılır
```

### Senaryo 3: Sadece Process'leri Durdurma

```bash
# 1. Durdurma script'ini çalıştır
./scripts/stop-expo.sh

# 2. Mevcut process'ler listelenir
# 3. Kullanıcıya sorulur: "Bu process'leri durdurmak istiyor musunuz? (E/H)"
# 4. E seçilirse process'ler durdurulur
# 5. Özet gösterilir:
#    ✓ Başarılı: 2
#    ✗ Başarısız: 0
```

---

## 🔧 Sorun Giderme

### Port Zaten Kullanımda

**Sorun:**
```
Error: listen EADDRINUSE: address already in use :::8081
```

**Çözüm:**
```bash
# Durdurma script'ini çalıştır
./scripts/stop-expo.sh

# Veya manuel olarak
# Windows (PowerShell):
netstat -ano | findstr :8081
Stop-Process -Id <PID> -Force

# Linux/Mac:
lsof -ti:8081 | xargs kill -9
```

### Script Çalışmıyor (PowerShell)

**Sorun:**
```
.\start-expo.ps1 : File cannot be loaded because running scripts is disabled on this system.
```

**Çözüm:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Script Çalışmıyor (Bash)

**Sorun:**
```
bash: ./start-expo.sh: Permission denied
```

**Çözüm:**
```bash
chmod +x scripts/*.sh
```

### Node Modules Bulunamadı

**Sorun:**
```
⚠️  node_modules bulunamadı.
```

**Çözüm:**
Script otomatik olarak `npm install` çalıştırır. Manuel çalıştırmak isterseniz:

```bash
npm install
```

---

## 📚 Ek Bilgiler

### Kontrol Edilen Portlar

- **8081:** Metro Bundler ana portu
- **8082:** Alternatif Metro Bundler portu
- **19000:** Expo DevTools portu
- **19001:** Expo Dev Server portu
- **19002:** Expo Dev Server WebSocket portu

### Process Durdurma Yöntemleri

**Windows (PowerShell):**
- `Stop-Process -Id <PID> -Force`

**Linux/Mac (Bash):**
- `kill -9 <PID>`

### Cache Temizleme

Expo cache'ini temizlemek istediğinizde script size seçenek sunar:

```
Expo cache'ini temizlemek istiyor musunuz? (E/H) [Varsayılan: H]:
```

- **E:** Cache temizlenerek başlatılır (`expo start --clear`)
- **H:** Normal başlatılır (`expo start`)

---

## 🤝 Katkıda Bulunma

Bu script'leri geliştirmek için önerileriniz varsa, lütfen issue açın veya pull request gönderin.

---

## 📄 Lisans

Bu script'ler proje lisansı altında lisanslanmıştır.

---

**Son Güncelleme:** 6 Kasım 2025
