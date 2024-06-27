# Project Documentation "Online Shop"

- [Russian Documentation](./lang-docs/ru.md) - Документация на русском языке.

## 1. Introduction

This project is an online shop with basic functionalities for user registration, profile management, and shopping cart management.

## 2. Technology Stack

The project utilizes the following technologies:

- **Frontend:**

  - **React** - JavaScript library for building user interfaces.
  - **React Router** - For client-side routing within the application.
  - **Axios** - HTTP client for interacting with the server.
  - **HTML** and **CSS** - Core markup and styling languages.

- **Backend:**
  - **Node.js** - JavaScript runtime environment on the server.
  - **Express.js** - Web framework for creating APIs and handling requests.
  - **SQLite** - Local database for storing user data and product information.
  - **Bcrypt.js** - Library for hashing user passwords securely.
  - **Express Session** and **Connect-SQLite3** - For managing user sessions and storing sessions in SQLite database.

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

## 5. Running the Project

To run the project locally, follow these steps:

- Install dependencies in the project root directory and in the client folder (`npm install`).
- Start the server-side (`node server/server.js`).
- Start the client-side (`npm start` in the client folder).

## 6. Conclusion

This document describes the main aspects of the "Online Shop" project, its functionality, and the technologies used. The project is designed to demonstrate basic principles of web development using React and Node.js.
