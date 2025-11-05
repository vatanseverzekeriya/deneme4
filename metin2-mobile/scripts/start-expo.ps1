# Expo Development Server Başlatma Script'i (PowerShell)
# Bu script, çoklu instance sorununu önlemek için portları kontrol eder ve temizler

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Expo Development Server Başlatıcı" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Port 8081 ve 8082'yi kontrol et
$ports = @(8081, 8082, 19000, 19001, 19002)
$foundProcesses = @()

Write-Host "Port kontrolü yapılıyor..." -ForegroundColor Yellow

foreach ($port in $ports) {
    $connections = netstat -ano | findstr ":$port"
    if ($connections) {
        $processIds = $connections | ForEach-Object {
            if ($_ -match '\s+(\d+)\s*$') {
                $matches[1]
            }
        } | Select-Object -Unique

        foreach ($pid in $processIds) {
            if ($pid -and $pid -ne 0) {
                try {
                    $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
                    if ($process) {
                        $foundProcesses += [PSCustomObject]@{
                            Port = $port
                            PID = $pid
                            ProcessName = $process.ProcessName
                        }
                    }
                } catch {
                    # Process bulunamadı, devam et
                }
            }
        }
    }
}

# Bulunan process'leri göster
if ($foundProcesses.Count -gt 0) {
    Write-Host ""
    Write-Host "⚠️  Aşağıdaki Expo/Metro process'leri bulundu:" -ForegroundColor Yellow
    Write-Host ""
    $foundProcesses | Format-Table -AutoSize
    Write-Host ""

    $response = Read-Host "Bu process'leri durdurmak istiyor musunuz? (E/H)"

    if ($response -eq "E" -or $response -eq "e") {
        Write-Host ""
        Write-Host "Process'ler durduruluyor..." -ForegroundColor Yellow

        foreach ($proc in $foundProcesses) {
            try {
                Stop-Process -Id $proc.PID -Force -ErrorAction Stop
                Write-Host "✓ Port $($proc.Port) - PID $($proc.PID) durduruldu" -ForegroundColor Green
            } catch {
                Write-Host "✗ Port $($proc.Port) - PID $($proc.PID) durdurulamadı: $_" -ForegroundColor Red
            }
        }

        # Process'lerin tamamen kapanması için kısa bir bekleme
        Write-Host ""
        Write-Host "Process'lerin kapanması bekleniyor..." -ForegroundColor Yellow
        Start-Sleep -Seconds 2
    } else {
        Write-Host ""
        Write-Host "⚠️  Mevcut process'ler çalışmaya devam edecek." -ForegroundColor Yellow
        Write-Host "Bu durumda yeni Expo instance'ı farklı bir port kullanabilir." -ForegroundColor Yellow
        Write-Host ""

        $continue = Read-Host "Yine de devam etmek istiyor musunuz? (E/H)"
        if ($continue -ne "E" -and $continue -ne "e") {
            Write-Host ""
            Write-Host "İşlem iptal edildi." -ForegroundColor Red
            exit 1
        }
    }
}

# Proje dizinine git
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectPath = Split-Path -Parent $scriptPath

Write-Host ""
Write-Host "Proje dizini: $projectPath" -ForegroundColor Cyan
Set-Location $projectPath

# Node modules kontrolü
if (-Not (Test-Path "node_modules")) {
    Write-Host ""
    Write-Host "⚠️  node_modules bulunamadı. Bağımlılıklar yükleniyor..." -ForegroundColor Yellow
    npm install

    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "✗ Bağımlılık yükleme başarısız oldu!" -ForegroundColor Red
        exit 1
    }
}

# Expo cache temizleme seçeneği
Write-Host ""
$clearCache = Read-Host "Expo cache'ini temizlemek istiyor musunuz? (E/H) [Varsayılan: H]"

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Expo Development Server Başlatılıyor..." -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Expo'yu başlat
if ($clearCache -eq "E" -or $clearCache -eq "e") {
    Write-Host "Cache temizleniyor ve Expo başlatılıyor..." -ForegroundColor Yellow
    npx expo start --clear
} else {
    Write-Host "Expo başlatılıyor..." -ForegroundColor Yellow
    npx expo start
}

# Hata durumunda bilgi ver
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "✗ Expo başlatılamadı!" -ForegroundColor Red
    Write-Host "Lütfen hata mesajlarını kontrol edin." -ForegroundColor Red
    exit 1
}
