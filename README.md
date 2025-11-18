# Real-Time Multiplayer Tic-Tac-Toe

## Project Overview

This project is a real-time multiplayer Tic-Tac-Toe game with the following features:

- User authentication (Sign up / Login)
- Multiplayer game creation and joining using unique Game IDs
- Interactive 3x3 game board
- Winner and draw detection
- Play again option to reset the game
- User name display in Lobby and Game pages
- Responsive design with animated gradient background

## Technologies Used

- **Frontend:** React, TypeScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** CSS with animations

### Prerequisites

- **Node.js & npm:**  
Download and install from [https://nodejs.org/](https://nodejs.org/).  

## Database Setup

The project uses MySQL to store user data (username, email, password).

### Step 1: Install MySQL Server
1. Download MySQL Community Server from [MySQL Downloads](https://dev.mysql.com/downloads/mysql/).
2. Follow the installer instructions and set a root password (e.g., `admin123`).
3. Install MySQL Workbench.

### Step 2: Create Database and Table
1. Open MySQL Workbench.
2. Connect to your local MySQL server with username `root` and your chosen password.
3. Execute the following SQL queries:

```sql
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
```

### Step 3: Update Backend Configuration

1. Open backend_temp/db.js.

2. Configure your database credentials:

```js
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
```

## Local Setup Instructions
### Step 1: Clone Project
```git
git clone https://github.com/AdithyaMarla/tictactoe-project.git
cd tictactoe-project
```
### Step 2: Backend Setup
```
cd backend_temp
npm install
node server.js
```

Backend runs on http://localhost:5000

### Step 3: Frontend Setup
```
cd ../frontend
npm install
npm install react-confetti --legacy-peer-deps
npm start
```

Frontend runs on http://localhost:3000

You can now login, register, create/join games, and play.


## Usage Instructions

- Register a new user with username, email, and password.

- Login with your credentials.

- Create a new game or join an existing game using the Game ID.

- Players take turns to play Tic-Tac-Toe.

- Winner is displayed with confetti, or a draw is declared.

- Click Play Again to reset the game for both players.

