import React, { useState } from "react";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setMessage("✅ Login successful! Redirecting...");

      // redirect to media page after login
      setTimeout(() => {
        window.location.href = "/media";
      }, 1000);
    } catch (err: any) {
      setMessage("❌ Invalid username or password");
      console.error(err);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded text-black"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded text-black"
            required
          />

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;