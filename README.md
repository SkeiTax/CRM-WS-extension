# CRM-WS-extension

Расширение для удобной работы с расписанием в CRM-системе IDENT, предназначено для браузеров на базе [Chromium](https://www.chromium.org/getting-involved/download-chromium/).

## Содержание

- [Основные возможности](#основные-возможности)
- [В планах](#в-планах)
- [Установка](#установка)
- [Обновление](#обновление)
- [При ошибках](#при-ошибках)

## Основные возможности

- Считает общее отработанное время, учитывая пересечения между сессиями и правильно **учитывает обеды**

- **Показывает**, времени **недоработки или переработки**

- Показывает **время в удобном и понятном формате**

- Отображает график рабочего дня со всеми перерывами

- Работает при смене месяца или года в отчёте

## В планах

- Улучшить внешний вид графика

- Добавить отображение графика за несколько месяцев подряд

- Разделить учёт очной и удалённой работы

## Установка

1. Скачайте нужную версию расширения:
    - [Последняя версия](https://github.com/SkeiTax/CRM-WS-extension/releases/latest/download/extension.zip)
    - Или выберите другую версию на странице [релизов](https://github.com/SkeiTax/CRM-WS-extension/releases)

2. Распакуйте архив `extension.zip` в любое удобное место

3. Откройте любимый браузер на основе [Chromium](https://www.chromium.org/getting-involved/download-chromium/):
    - Google Chome
    - Yandex Browser
    - и другие

4. Перейдите на страницу расширений:
    - [chrome://extensions](chrome://extensions) - для Google Chome и Chomium
    - [browser://extensions](browser://extensions) - для Yandex Browser

5. Включите [Режим разработчика](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=ru#load-unpacked) в правом верхнем углу открывшейся страницы

6. Загрузите [распакованное расширение](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=ru#load-unpacked) и выберите папку, куда вы распаковали архив

7. Готово! Наслаждайтесь установленным расширением ❤️

## Обновление

Для обновления используйте встроенные скрипты в папке с расширением. После обновления файлов не забудьте обновить расширение в браузере.

1. Перейдите в папку с расширением

2. Запустите нужный скрипт:
    - `update-windows.bat` - для OS Windows
    - `update-linux.sh` - для Linux основаных US
3. Дождитесь завершения **(предупреждение об окончании может не появиться)**

4. Откройте страницу управления расширениями:
    - [chrome://extensions](chrome://extensions) - для Google Chome и Chomium
    - [browser://extensions](browser://extensions) - для Yandex Browser

5. Найдите нужное расширение и нажмите кнопу [обновления](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=ru#reload)

6. Готово! Наслаждайтесь свежей версией расширения ❤️

## При ошибках

Если у вас возникли ошибки с расширением, то выполните следующие действия:

1. Откройте страницу с CRM.

2. Откройте консоль разработчика. Сочетания клавиш: 
    - `F12`
    - `Ctrl + Shift + I`

3. Вставьте следующую команду:
    ```js
    window.postMessage({ type: "CRMEDump_CALL" }, "*" );
    ```

4. Отправить результат выполненной команды [Дорофееву Андрею Викторовичу](https://renident.bitrix24.ru/company/personal/user/2215/).