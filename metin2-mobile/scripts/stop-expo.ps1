# Expo Development Server Durdurma Script'i (PowerShell)
# Bu script, çalışan tüm Expo/Metro process'lerini bulur ve durdurur

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Expo Development Server Durdurucu" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Expo/Metro portlarını tanımla
$ports = @(8081, 8082, 19000, 19001, 19002)
$foundProcesses = @()

Write-Host "Expo/Metro process'leri aranıyor..." -ForegroundColor Yellow
Write-Host ""

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
                            StartTime = $process.StartTime
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
if ($foundProcesses.Count -eq 0) {
    Write-Host "✓ Hiçbir Expo/Metro process'i bulunamadı." -ForegroundColor Green
    Write-Host "Tüm portlar temiz." -ForegroundColor Green
    exit 0
}

Write-Host "Bulunan process'ler:" -ForegroundColor Yellow
Write-Host ""
$foundProcesses | Format-Table -AutoSize
Write-Host ""

# Kullanıcıya onay sor
$response = Read-Host "Bu process'leri durdurmak istiyor musunuz? (E/H)"

if ($response -ne "E" -and $response -ne "e") {
    Write-Host ""
    Write-Host "İşlem iptal edildi." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Process'ler durduruluyor..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($proc in $foundProcesses) {
    try {
        Stop-Process -Id $proc.PID -Force -ErrorAction Stop
        Write-Host "✓ Port $($proc.Port) - PID $($proc.PID) ($($proc.ProcessName)) durduruldu" -ForegroundColor Green
        $successCount++
    } catch {
        Write-Host "✗ Port $($proc.Port) - PID $($proc.PID) durdurulamadı: $_" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Özet:" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "✓ Başarılı: $successCount" -ForegroundColor Green
Write-Host "✗ Başarısız: $failCount" -ForegroundColor $(if ($failCount -gt 0) { "Red" } else { "Green" })
Write-Host ""

if ($successCount -gt 0) {
    Write-Host "Portlar temizlendi. Artık Expo'yu yeniden başlatabilirsiniz." -ForegroundColor Green
}

exit $(if ($failCount -gt 0) { 1 } else { 0 })
