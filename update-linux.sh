#!/bin/bash

# Настройки
REPO_USER="SkeiTax" 
REPO_NAME="CRM-WS-extension"
ZIP_NAME="extension.zip"

# Папка скрипта
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# URL последнего релиза
ZIP_URL="https://github.com/${REPO_USER}/${REPO_NAME}/releases/latest/download/${ZIP_NAME}"

# Скачивание .zip
echo "🔽 Downloading latest version from GitHub..."
curl -L -o "$SCRIPT_DIR/$ZIP_NAME" "$ZIP_URL" || {
    echo "❌ Failed to download archive"
    exit 1
}

# Создание временной папки
TEMP_DIR="$SCRIPT_DIR/update_temp"
rm -rf "$TEMP_DIR"
mkdir "$TEMP_DIR"

# Распаковка
echo "📦 Extracting files..."
unzip -q "$SCRIPT_DIR/$ZIP_NAME" -d "$TEMP_DIR"

# Копирование файлов в текущую папку (замена)
echo "🔄 Replacing files..."
cp -r "$TEMP_DIR/"* "$SCRIPT_DIR/"

# Очистка
rm -rf "$TEMP_DIR"
rm "$SCRIPT_DIR/$ZIP_NAME"

echo "✅ Update completed!"
