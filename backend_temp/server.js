//server.js

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes); // matches frontend api calls

// Game routes
const gameRoutes = require("./routes/game");
app.use("/game", gameRoutes); // matches frontend api calls

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
