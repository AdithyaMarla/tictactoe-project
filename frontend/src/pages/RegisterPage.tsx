//RegisterPage

import React, { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { username, email, password });

      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Registration failed");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>

        <p style={styles.message}>{message}</p>

        <p style={styles.linkText}>
          Already have an account?{" "}
          <Link to="/" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    padding: "20px",
  },
  card: {
    width: "350px",
    padding: "30px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2575fc",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "17px",
    cursor: "pointer",
    transition: "0.2s",
  },
  message: {
    marginTop: "15px",
    color: "#555",
    minHeight: "20px",
  },
  linkText: {
    marginTop: "15px",
    color: "#444",
  },
  link: {
    color: "#2575fc",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default RegisterPage;
