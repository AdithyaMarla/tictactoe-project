//WinnerPage.tsx

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Confetti from "react-confetti";
import { api } from "../services/api";

const WinnerPage: React.FC = () => {
  const { winner, gameId } = useParams<{ winner: string; gameId: string }>();
  const navigate = useNavigate();

  const handlePlayAgain = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/game/reset",
        { gameId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect back to the same game page
      navigate(`/game/${gameId}`);
    } catch (err) {
      console.error("Play again failed", err);
    }
  };

  const isDraw = winner === "draw";

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
        textAlign: "center",
        padding: "20px",
      }}
    >
      {!isDraw && <Confetti />}
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        {isDraw ? "It's a Draw!" : `Player ${winner} Wins!`}
      </h1>
      <button
        onClick={handlePlayAgain}
        style={{
          padding: "15px 30px",
          fontSize: "20px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          background: "#ffcc00",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        Play Again
      </button>
    </div>
  );
};

export default WinnerPage;
