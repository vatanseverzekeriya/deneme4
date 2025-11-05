#!/bin/bash

# Expo Development Server Başlatma Script'i (Bash)
# Bu script, çoklu instance sorununu önlemek için portları kontrol eder ve temizler

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}=================================="
echo -e "Expo Development Server Başlatıcı"
echo -e "==================================${NC}"
echo ""

# Port 8081 ve 8082'yi kontrol et
PORTS=(8081 8082 19000 19001 19002)
FOUND_PROCESSES=()

echo -e "${YELLOW}Port kontrolü yapılıyor...${NC}"

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
                FOUND_PROCESSES+=("$port:$pid:$process_name")
            fi
        done
    fi
done

# Bulunan process'leri göster
if [ ${#FOUND_PROCESSES[@]} -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}⚠️  Aşağıdaki Expo/Metro process'leri bulundu:${NC}"
    echo ""
    printf "%-10s %-10s %-20s\n" "Port" "PID" "Process"
    printf "%-10s %-10s %-20s\n" "----" "---" "-------"

    for proc in "${FOUND_PROCESSES[@]}"; do
        IFS=':' read -r port pid name <<< "$proc"
        printf "%-10s %-10s %-20s\n" "$port" "$pid" "$name"
    done

    echo ""
    read -p "Bu process'leri durdurmak istiyor musunuz? (E/H): " response

    if [[ "$response" =~ ^[Ee]$ ]]; then
        echo ""
        echo -e "${YELLOW}Process'ler durduruluyor...${NC}"

        for proc in "${FOUND_PROCESSES[@]}"; do
            IFS=':' read -r port pid name <<< "$proc"

            if kill -9 $pid 2>/dev/null; then
                echo -e "${GREEN}✓ Port $port - PID $pid durduruldu${NC}"
            else
                echo -e "${RED}✗ Port $port - PID $pid durdurulamadı${NC}"
            fi
        done

        # Process'lerin tamamen kapanması için kısa bir bekleme
        echo ""
        echo -e "${YELLOW}Process'lerin kapanması bekleniyor...${NC}"
        sleep 2
    else
        echo ""
        echo -e "${YELLOW}⚠️  Mevcut process'ler çalışmaya devam edecek.${NC}"
        echo -e "${YELLOW}Bu durumda yeni Expo instance'ı farklı bir port kullanabilir.${NC}"
        echo ""

        read -p "Yine de devam etmek istiyor musunuz? (E/H): " continue_response
        if [[ ! "$continue_response" =~ ^[Ee]$ ]]; then
            echo ""
            echo -e "${RED}İşlem iptal edildi.${NC}"
            exit 1
        fi
    fi
fi

# Proje dizinine git
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo ""
echo -e "${CYAN}Proje dizini: $PROJECT_DIR${NC}"
cd "$PROJECT_DIR"

# Node modules kontrolü
if [ ! -d "node_modules" ]; then
    echo ""
    echo -e "${YELLOW}⚠️  node_modules bulunamadı. Bağımlılıklar yükleniyor...${NC}"
    npm install

    if [ $? -ne 0 ]; then
        echo ""
        echo -e "${RED}✗ Bağımlılık yükleme başarısız oldu!${NC}"
        exit 1
    fi
fi

# Expo cache temizleme seçeneği
echo ""
read -p "Expo cache'ini temizlemek istiyor musunuz? (E/H) [Varsayılan: H]: " clear_cache

echo ""
echo -e "${CYAN}=================================="
echo -e "Expo Development Server Başlatılıyor..."
echo -e "==================================${NC}"
echo ""

# Expo'yu başlat
if [[ "$clear_cache" =~ ^[Ee]$ ]]; then
    echo -e "${YELLOW}Cache temizleniyor ve Expo başlatılıyor...${NC}"
    npx expo start --clear
else
    echo -e "${YELLOW}Expo başlatılıyor...${NC}"
    npx expo start
fi

# Hata durumunda bilgi ver
if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}✗ Expo başlatılamadı!${NC}"
    echo -e "${RED}Lütfen hata mesajlarını kontrol edin.${NC}"
    exit 1
fi
