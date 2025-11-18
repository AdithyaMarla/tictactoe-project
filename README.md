1. Project Overview

This project is a real-time multiplayer Tic-Tac-Toe game with the following features:

User authentication (Sign up / Login)

Multiplayer game creation and joining using unique Game IDs

Interactive 3x3 game board

Winner and draw detection

Play again option to reset the game

User name display in Lobby and Game pages

Responsive design with animated gradient background

2. Technologies Used

Frontend: React, TypeScript

Backend: Node.js, Express.js

Database: MySQL

Authentication: JWT (JSON Web Tokens)

Styling: CSS with animations

3. Database Setup

The project uses MySQL to store user data (username, email, password).

Step 1: Install MySQL Server

Download MySQL Community Server from [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)

Follow the installer instructions and set a root password (e.g., admin123).

Install MySQL Workbench 

Step 2: Create Database and Table

Open MySQL Workbench.

Connect to your local MySQL server with username root and your chosen password.

Execute the following SQL queries:

-- Create the database
CREATE DATABASE tictactoe;

-- Use the database
USE tictactoe;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Step 3: Update Backend Configuration

Open backend_temp/db.js.

Configure your database credentials:

const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123", // Replace with your MySQL password
    database: "tictactoe"
});

db.connect((err) => {
    if (err) console.error("DB connection error:", err);
    else console.log("Connected to database");
});

module.exports = db;

4. Local Setup Instructions
Step 1: Clone Project
git clone https://github.com/AdithyaMarla/tictactoe-project.git
cd tictactoe-project

Step 2: Backend Setup
cd backend_temp
npm install
node server.js


Backend runs on http://localhost:5000

Step 3: Frontend Setup
cd ../frontend
npm install
npm install react-confetti --legacy-peer-deps
npm start


1 Frontend runs on http://localhost:3000

You can now login, register, create/join games, and play.

5. Usage Instructions

Register a new user with username, email, and password.

Login with your credentials.

Create a new game or join an existing game using the Game ID.

Players take turns to play Tic-Tac-Toe.

Winner is displayed with confetti, or a draw is declared.

Click Play Again to reset the game for both players.

