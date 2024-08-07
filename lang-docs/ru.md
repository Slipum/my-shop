# Документация проекта: "Интернет-магазин"

## 1. Введение

Этот проект представляет собой интернет-магазин с функционалом для регистрации пользователей, управления профилем, управления корзиной покупок и админ-панелью для расширенного управления пользователями и продуктами.

## 2. Технологический стек

Проект использует следующие технологии:

- **Frontend:**

  - ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat) JavaScript библиотека для создания пользовательских интерфейсов.
  - ![React Router](https://img.shields.io/badge/-React_Router-CA4245?logo=react-router&logoColor=white&style=flat) Для клиентской маршрутизации в приложении.
  - ![Axios](https://img.shields.io/badge/-Axios-61DAFB?logo=axios&logoColor=white&style=flat) HTTP клиент для взаимодействия с сервером.
  - ![HTML](https://img.shields.io/badge/-HTML-E34F26?logo=html5&logoColor=white&style=flat) Язык разметки для создания веб-страниц.
  - ![CSS](https://img.shields.io/badge/-CSS-1572B6?logo=css3&logoColor=white&style=flat) Язык стилей для дизайна веб-страниц.

- **Backend:**
  - ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat) Среда выполнения JavaScript на сервере.
  - ![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white&style=flat) Веб-фреймворк для создания API и обработки запросов.
  - ![SQLite](https://img.shields.io/badge/-SQLite-003B57?logo=sqlite&logoColor=white&style=flat) Локальная база данных для хранения данных пользователей и информации о продуктах.
  - ![Bcrypt.js](https://img.shields.io/badge/-Bcrypt.js-2A2D2E?logo=npm&logoColor=white&style=flat) Библиотека для безопасного хеширования паролей пользователей.
  - ![Express Session](https://img.shields.io/badge/-Express_Session-000000?logo=express&logoColor=white&style=flat) Для управления сеансами пользователей.
  - ![Connect-SQLite3](https://img.shields.io/badge/-Connect_SQLite3-003B57?style=flat) Для хранения сеансов в базе данных SQLite.

## 3. Клиентская часть

- **Структура проекта:**

  - **src/**
    - **components/**
      - **business/** - Компоненты для бизнес-логики.
      - **pages/** - Основные страницы, такие как регистрация, вход и профиль пользователя.
    - **api.js** - Модуль для взаимодействия с сервером через Axios.
    - **App.js** - Главный компонент приложения, который содержит маршрутизацию.

- **Функциональность:**
  - **Регистрация и Вход:** Формы для регистрации новых пользователей и входа в систему.
  - **Профиль:** Отображение информации о пользователе (имя пользователя и email). Доступ ограничен для аутентифицированных пользователей.
  - **Корзина покупок:** Возможность добавления и удаления товаров.
  - **Админ-панель:** Доступна только пользователям с именем пользователя 'admin'. Позволяет просматривать всех зарегистрированных пользователей, добавлять и удалять продукты, а также гарантирует, что удаленные продукты удаляются из корзин всех пользователей.

## 4. Серверная часть

- **Структура проекта:**

  - **server/**
    - **routes/** - Маршруты для обработки запросов клиентов.
    - **middleware/** - Промежуточные функции, такие как проверка аутентификации.
    - **database.js** - Подключение к базе данных SQLite и выполнение запросов.
    - **server.js** - Главный файл, запускающий сервер Express и настройки.

- **Функциональность:**

  - **Аутентификация:** Регистрация, вход и выход пользователя. Пароли хранятся безопасно с использованием bcrypt.js.
  - **Управление профилем:** Получение информации о профиле пользователя.
  - **Административные функции:** Управление пользователями и продуктами. Доступ ограничен для пользователя admin. При удалении продукта из админ-панели он также удаляется из корзин всех пользователей, если он был добавлен.

  > Для того чтобы зайти в админ панель нужно зарегистрировать пользователя под username: `admin` и на _header_ появиться новая кнопка захода в админ панель

## 5. Запуск проекта

Для локального запуска проекта выполните следующие шаги:

- **1.** Установите зависимости в корневой директории проекта:

  Вы можете одновременно установить зависимости для сервера и клиентской части, используя следующую команду:

  ```bash
  npm run all-i
  ```

- **2.** Запуск сервера и клиента одновременно:

  Для удобства разработки вы можете запустить и серверную, и клиентскую часть одной командой:

  ```bash
  npm run dev
  ```

  Этот скрипт использует `concurrently` для одновременного запуска сервера и клиентской части.

> Альтернативно, вы можете запустить каждую часть отдельно:

- Запуск серверной части приложения:

  ```bash
  npm run backend
  ```

  Этот скрипт запускает сервер Node.js с помощью `nodemon`, который автоматически перезапускает сервер при изменении файлов.

- Запуск клиентской части приложения:

  ```bash
  npm run frontend
  ```

  Этот скрипт переходит в папку клиента (`client`) и запускает приложение React.

## 6. Заключение

Этот документ описывает основные аспекты проекта "Интернет-магазин", его функциональность и используемые технологии. Проект разработан для демонстрации базовых принципов веб-разработки с использованием React и Node.js, включая аутентификацию пользователей, управление профилем, функциональность корзины покупок и административный контроль для управления пользователями и продуктами.
