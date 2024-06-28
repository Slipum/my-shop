# Project Documentation "Online Shop"

- :ru: [Russian Documentation](./lang-docs/ru.md) - Документация на русском языке.

## 1. Introduction

This project is an online shop with basic functionalities for user registration, profile management, and shopping cart management.

## 2. Technology Stack

The project utilizes the following technologies:

- **Frontend:**

  - ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat) JavaScript library for building user interfaces.
  - ![React Router](https://img.shields.io/badge/-React_Router-CA4245?logo=react-router&logoColor=white&style=flat) For client-side routing within the application.
  - ![Axios](https://img.shields.io/badge/-Axios-61DAFB?logo=axios&logoColor=white&style=flat) HTTP client for interacting with the server.
  - ![HTML](https://img.shields.io/badge/-HTML-E34F26?logo=html5&logoColor=white&style=flat) Markup language for creating web pages.
  - ![CSS](https://img.shields.io/badge/-CSS-1572B6?logo=css3&logoColor=white&style=flat) Style sheet language for designing web pages.

- **Backend:**
  - ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat) JavaScript runtime environment on the server.
  - ![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white&style=flat) Web framework for creating APIs and handling requests.
  - ![SQLite](https://img.shields.io/badge/-SQLite-003B57?logo=sqlite&logoColor=white&style=flat) Local database for storing user data and product information.
  - ![Bcrypt.js](https://img.shields.io/badge/-Bcrypt.js-2A2D2E?logo=npm&logoColor=white&style=flat) Library for hashing user passwords securely.
  - ![Express Session](https://img.shields.io/badge/-Express_Session-000000?logo=express&logoColor=white&style=flat) For managing user sessions.
  - ![Connect-SQLite3](https://img.shields.io/badge/-Connect_SQLite3-003B57?style=flat) For storing sessions in SQLite database.

## 3. Client-side

- **Project Structure:**

  - **src/**
    - **components/** - Application components.
    - **pages/** - Main pages such as registration, login, and user profile.
    - **api.js** - Module for server interaction using Axios.
    - **App.js** - Main application component containing routing logic.

- **Functionality:**
  - **Registration and Login:** Forms for registering new users and logging into the system.
  - **Profile:** Display of user information (username and email).
  - **Shopping Cart:** Ability to add and remove items.

## 4. Server-side

- **Project Structure:**

  - **server/**
    - **routes/** - Routes for handling client requests.
    - **middleware/** - Middleware functions such as authentication checks.
    - **controllers/** - Controllers for handling route logic.
    - **database.js** - Connection to SQLite database and query execution.
    - **server.js** - Main file launching Express server and configurations.

- **Functionality:**
  - **Authentication:** User registration, login, and logout.
  - **Profile Management:** Retrieval of user profile information.
  - **Administrative Functions:** User and product management.

## 5. Project Setup

To run the project locally, follow these steps:

- **1.** Install dependencies in the project's root directory:

  You can install dependencies for both the server and client sides simultaneously using the following command:

  ```bash
  npm run all-i
  ```

- **2.** Run the server and client simultaneously:

  For development convenience, you can start both the server and client with one command:

  ```bash
  npm run dev
  ```

  This script uses `concurrently` to run the server and client simultaneously.

> Alternatively, you can start each part separately:

- Start the server-side of the application:

  ```bash
  npm run backend
  ```

  This script launches the Node.js server using `nodemon`, which automatically restarts the server upon file changes.

- Start the client-side of the application:

  ```bash
  npm run frontend
  ```

  This script navigates to the client directory (`client`) and starts the React application.

## 6. Conclusion

This document describes the main aspects of the "Online Shop" project, its functionality, and the technologies used. The project is designed to demonstrate basic principles of web development using React and Node.js.
