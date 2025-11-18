import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const LobbyPage: React.FC = () => {
  const [gameId, setGameId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Auto-hide message after 4 sec
  const showTempMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  // Fetch current user info
  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(res.data.username);
    } catch (err) {
      console.error("Failed to fetch user info", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleCreateGame = async () => {
    try {
      const res = await api.post(
        "/game/create",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/game/${res.data.gameId}`);
    } catch (err: any) {
      showTempMessage(err.response?.data?.error || "Failed to create game");
    }
  };

  const handleJoinGame = async () => {
    if (!gameId) {
      showTempMessage("Enter Game ID to join");
      return;
    }
    try {
      await api.post(
        "/game/join",
        { gameId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/game/${gameId}`);
    } catch (err: any) {
      showTempMessage(err.response?.data?.error || "Failed to join game");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #6e00ff, #ff0077, #ff8c00)",
        backgroundSize: "300% 300%",
        animation: "gradientMove 8s ease infinite",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        position: "relative",
      }}
    >
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .card {
            backdrop-filter: blur(14px);
            background: rgba(255, 255, 255, 0.15);
            border-radius: 18px;
            padding: 40px;
            width: 350px;
            text-align: center;
            box-shadow: 0 8px 25px rgba(0,0,0,0.25);
            animation: fadeIn 0.7s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .inputBox {
            width: 100%;
            padding: 12px;
            margin-top: 15px;
            border-radius: 10px;
            border: none;
            font-size: 16px;
            outline: none;
            background: rgba(255,255,255,0.8);
          }

          .button {
            width: 100%;
            padding: 12px;
            margin-top: 18px;
            border: none;
            border-radius: 12px;
            font-size: 17px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.25s;
            background: #fff;
          }

          .button:hover {
            transform: scale(1.04);
            background: #ffe6ff;
          }

          .errorMsg {
            color: white;
            margin-top: 15px;
            font-size: 15px;
            animation: fadeIn 0.3s ease;
          }

          .usernameDisplay {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-weight: bold;
            font-size: 16px;
          }
        `}
      </style>

      {username && <div className="usernameDisplay">👤 {username}</div>}

      <div className="card">
        <h2 style={{ color: "white", marginBottom: "20px" }}>🎮 Game Lobby</h2>

        <button className="button" onClick={handleCreateGame}>
          ➕ Create New Game
        </button>

        <hr style={{ margin: "25px 0", borderColor: "rgba(255,255,255,0.3)" }} />

        <input
          className="inputBox"
          type="text"
          placeholder="Enter Game ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />

        <button className="button" onClick={handleJoinGame}>
          🔗 Join Game
        </button>

        {message && <p className="errorMsg">{message}</p>}
      </div>
    </div>
  );
};

export default LobbyPage;
