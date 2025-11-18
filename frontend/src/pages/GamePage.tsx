import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  const [board, setBoard] = useState<string[][]>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [draw, setDraw] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [playerSymbol, setPlayerSymbol] = useState<string>("");
  const [username, setUsername] = useState<string>(""); // Logged-in username

  const token = localStorage.getItem("token");

  // Fetch game state
  const fetchGame = async () => {
    try {
      const res = await api.get(`/game/${gameId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBoard(res.data.board);
      setCurrentPlayer(res.data.currentPlayer);
      setWinner(res.data.winner);
      setDraw(res.data.draw);
      setPlayerSymbol(res.data.symbol || "");
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Failed to load game");
    }
  };

  // Make a move
  const handleMove = async (row: number, col: number) => {
    if (winner || draw) return;

    try {
      const res = await api.post(
        "/game/move",
        { gameId, row, col },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBoard(res.data.board);
      setCurrentPlayer(res.data.currentPlayer);
      setWinner(res.data.winner);
      setDraw(res.data.draw);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Move failed");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  // Auto-refresh every second
  useEffect(() => {
    fetchGame();
    const interval = setInterval(fetchGame, 1000);
    return () => clearInterval(interval);
  }, []);

  // Navigate to winner page when game ends
  useEffect(() => {
    if (winner) {
      navigate(`/winner/${winner}/${gameId}`);
    } else if (draw) {
      navigate(`/winner/draw/${gameId}`);
    }
  }, [winner, draw, navigate, gameId]);

  // Fetch logged-in username
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(res.data.username);
      } catch (err) {
        console.error("Could not fetch username");
      }
    };
    fetchUser();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #2c3e50, #4ca1af)",
        color: "white",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* Username top-right */}
      {username && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {username}
        </div>
      )}

      <h2>Game ID: {gameId}</h2>

      {playerSymbol && (
        <h3>
          You are <b>Player {playerSymbol}</b>
        </h3>
      )}

      <p style={{ height: "20px", color: "yellow" }}>{message}</p>
      {winner && <h3>Winner: {winner}</h3>}
      {draw && <h3>It's a draw!</h3>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleMove(rowIndex, colIndex)}
              style={{
                width: "100px",
                height: "100px",
                fontSize: "35px",
                borderRadius: "10px",
                background: "#ffffff22",
                color: "white",
                border: "1px solid white",
                cursor: cell || winner || draw ? "default" : "pointer",
              }}
            >
              {cell || ""}
            </button>
          ))
        )}
      </div>

      <p style={{ marginTop: "15px" }}>Current Turn: {currentPlayer}</p>
    </div>
  );
};

export default GamePage;
