//game.js


const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const TicTacToe = require("../game/tictactoe");

// Store ongoing multiplayer games
const games = {};

// Create a new game (creator = X)
router.post("/create", authMiddleware, (req, res) => {
    const gameId = Date.now().toString();
    const game = new TicTacToe();

    games[gameId] = {
        game,
        players: [
            { userId: req.user.id, symbol: "X" } // creator = X
        ],
        currentPlayerIndex: 0,
        moves: 0
    };

    res.json({
        message: "Game created",
        gameId,
        symbol: "X" // send to frontend
    });
});

// Join existing game (joiner = O)
router.post("/join", authMiddleware, (req, res) => {
    const { gameId } = req.body;
    const gameData = games[gameId];

    if (!gameData) return res.status(404).json({ error: "Game not found" });
    if (gameData.players.length >= 2)
        return res.status(400).json({ error: "Game full" });

    const playerEntry = { userId: req.user.id, symbol: "O" };
    gameData.players.push(playerEntry);

    res.json({
        message: "Joined game",
        board: gameData.game.getBoard(),
        currentPlayer: gameData.game.currentPlayer,
        symbol: "O" // send to frontend
    });
});

// Make a move
router.post("/move", authMiddleware, (req, res) => {
    const { gameId, row, col } = req.body;
    const gameData = games[gameId];

    if (!gameData) return res.status(404).json({ error: "Game not found" });

    const userIndex = gameData.players.findIndex(
        (p) => p.userId === req.user.id
    );

    if (userIndex !== gameData.currentPlayerIndex)
        return res.status(400).json({ error: "Not your turn" });

    const validMove = gameData.game.makeMove(row, col);
    if (!validMove) return res.status(400).json({ error: "Invalid move" });

    gameData.moves++;

    if (!gameData.game.winner) {
        gameData.currentPlayerIndex = 1 - gameData.currentPlayerIndex;
    }

    res.json({
        board: gameData.game.getBoard(),
        currentPlayer: gameData.game.currentPlayer,
        winner: gameData.game.winner,
        draw: !gameData.game.winner && gameData.moves >= 9
    });
});

// Get game status
router.get("/:gameId", authMiddleware, (req, res) => {
    const { gameId } = req.params;
    const gameData = games[gameId];

    if (!gameData) return res.status(404).json({ error: "Game not found" });

    // Detect the user's symbol
    const userSymbol =
        gameData.players.find((p) => p.userId === req.user.id)?.symbol || null;

    res.json({
        board: gameData.game.getBoard(),
        currentPlayer: gameData.game.currentPlayer,
        winner: gameData.game.winner,
        draw: !gameData.game.winner && gameData.moves >= 9,
        symbol: userSymbol
    });
});


// 🔥 NEW: RESET GAME
router.post("/reset", authMiddleware, (req, res) => {
    const { gameId } = req.body;
    const gameData = games[gameId];

    if (!gameData) return res.status(404).json({ error: "Game not found" });

    // Only allow reset if both players are in the game
    if (gameData.players.length < 2)
        return res.status(400).json({ error: "Both players must be connected to reset" });

    // Reset game instance
    gameData.game = new TicTacToe();
    gameData.currentPlayerIndex = 0;
    gameData.moves = 0;

    res.json({
        message: "Game reset successfully",
        board: gameData.game.getBoard(),
        currentPlayer: gameData.game.currentPlayer,
        winner: null,
        draw: false
    });
});

module.exports = router;
