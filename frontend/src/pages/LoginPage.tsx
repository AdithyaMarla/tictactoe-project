//LoginPage.js

import React, { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);

      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/lobby"), 1200);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Login failed");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        <p style={styles.message}>{message}</p>

        <p style={styles.linkText}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: "100vh",
    width: "100vw",
    margin: 0,
    padding: 0,
    overflow: "hidden", // 🔥 prevents scrolling
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #2575fc, #6a11cb)",
  },
  card: {
    width: "350px",
    padding: "30px",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "14px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.25)",
    textAlign: "center",
    backdropFilter: "blur(8px)",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    background: "#6a11cb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    minHeight: "20px",
    color: "#444",
  },
  linkText: {
    marginTop: "10px",
    color: "#333",
  },
  link: {
    color: "#2575fc",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default LoginPage;
