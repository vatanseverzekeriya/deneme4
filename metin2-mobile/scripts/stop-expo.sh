#!/bin/bash

# Expo Development Server Durdurma Script'i (Bash)
# Bu script, çalışan tüm Expo/Metro process'lerini bulur ve durdurur

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}=================================="
echo -e "Expo Development Server Durdurucu"
echo -e "==================================${NC}"
echo ""

# Expo/Metro portlarını tanımla
PORTS=(8081 8082 19000 19001 19002)
FOUND_PROCESSES=()

echo -e "${YELLOW}Expo/Metro process'leri aranıyor...${NC}"
echo ""

for port in "${PORTS[@]}"; do
    if command -v lsof &> /dev/null; then
        # lsof kullanarak port kontrolü (macOS ve bazı Linux dağıtımları)
        pids=$(lsof -ti:$port 2>/dev/null)
    elif command -v netstat &> /dev/null; then
        # netstat kullanarak port kontrolü (Linux)
        pids=$(netstat -tlnp 2>/dev/null | grep ":$port " | awk '{print $7}' | cut -d'/' -f1)
    elif command -v ss &> /dev/null; then
        # ss kullanarak port kontrolü (modern Linux)
        pids=$(ss -tlnp 2>/dev/null | grep ":$port " | grep -oP 'pid=\K[0-9]+')
    else
        echo -e "${RED}✗ Port kontrolü için gerekli araçlar bulunamadı (lsof, netstat veya ss gerekli)${NC}"
        exit 1
    fi

    if [ ! -z "$pids" ]; then
        for pid in $pids; do
            if [ "$pid" != "0" ] && kill -0 $pid 2>/dev/null; then
                process_name=$(ps -p $pid -o comm= 2>/dev/null || echo "unknown")
                start_time=$(ps -p $pid -o lstart= 2>/dev/null || echo "unknown")
                FOUND_PROCESSES+=("$port:$pid:$process_name:$start_time")
            fi
        done
    fi
done

# Bulunan process'leri göster
if [ ${#FOUND_PROCESSES[@]} -eq 0 ]; then
    echo -e "${GREEN}✓ Hiçbir Expo/Metro process'i bulunamadı.${NC}"
    echo -e "${GREEN}Tüm portlar temiz.${NC}"
    exit 0
fi

echo -e "${YELLOW}Bulunan process'ler:${NC}"
echo ""
printf "%-10s %-10s %-20s %-30s\n" "Port" "PID" "Process" "Başlangıç Zamanı"
printf "%-10s %-10s %-20s %-30s\n" "----" "---" "-------" "-----------------"

for proc in "${FOUND_PROCESSES[@]}"; do
    IFS=':' read -r port pid name start_time <<< "$proc"
    printf "%-10s %-10s %-20s %-30s\n" "$port" "$pid" "$name" "$start_time"
done

echo ""

# Kullanıcıya onay sor
read -p "Bu process'leri durdurmak istiyor musunuz? (E/H): " response

if [[ ! "$response" =~ ^[Ee]$ ]]; then
    echo ""
    echo -e "${YELLOW}İşlem iptal edildi.${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}Process'ler durduruluyor...${NC}"
echo ""

success_count=0
fail_count=0

for proc in "${FOUND_PROCESSES[@]}"; do
    IFS=':' read -r port pid name start_time <<< "$proc"

    if kill -9 $pid 2>/dev/null; then
        echo -e "${GREEN}✓ Port $port - PID $pid ($name) durduruldu${NC}"
        ((success_count++))
    else
        echo -e "${RED}✗ Port $port - PID $pid durdurulamadı${NC}"
        ((fail_count++))
    fi
done

echo ""
echo -e "${CYAN}=================================="
echo -e "Özet:"
echo -e "==================================${NC}"
echo -e "${GREEN}✓ Başarılı: $success_count${NC}"

if [ $fail_count -gt 0 ]; then
    echo -e "${RED}✗ Başarısız: $fail_count${NC}"
else
    echo -e "${GREEN}✗ Başarısız: $fail_count${NC}"
fi

echo ""

if [ $success_count -gt 0 ]; then
    echo -e "${GREEN}Portlar temizlendi. Artık Expo'yu yeniden başlatabilirsiniz.${NC}"
fi

exit $(if [ $fail_count -gt 0 ]; then echo 1; else echo 0; fi)
