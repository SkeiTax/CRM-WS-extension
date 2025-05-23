@echo off
setlocal enabledelayedexpansion

:: Конфигурация
set REPO_USER=SkeiTax
set REPO_NAME=CRM-WS-extension
set ZIP_NAME=extension.zip

:: Скачивание последней версии .zip из GitHub Release
echo 🔽 Downloading latest version...
curl -L -o "%ZIP_NAME%" "https://github.com/%REPO_USER%/%REPO_NAME%/releases/latest/download/%ZIP_NAME%"
if %errorlevel% neq 0 (
    echo ❌ Failed to download zip file
    exit /b 1
)

:: Создание временной папки
set TEMP_DIR=update_temp
if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"
mkdir "%TEMP_DIR%"

:: Распаковка
echo 📦 Extracting...
powershell -Command "Expand-Archive -Path '%ZIP_NAME%' -DestinationPath '%TEMP_DIR%' -Force"

:: Копирование файлов с заменой
echo 🔄 Replacing files...
xcopy /E /Y /Q "%TEMP_DIR%\*" "%~dp0"

:: Удаление временных файлов
rmdir /s /q "%TEMP_DIR%"
del "%ZIP_NAME%"

echo ✅ Update completed!
pause
