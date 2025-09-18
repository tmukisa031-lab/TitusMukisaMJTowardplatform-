import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthForm = () => {
  const { login, register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        await login(username, password);
      } else {
        await register(username, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-gray-900 text-white rounded-lg">
      <h2 className="text-lg mb-2">{mode === "login" ? "Login" : "Register"}</h2>
      {error && <p className="text-red-400">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-2 p-2 rounded text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-teal-500 py-2 rounded mt-2"
        >
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>
      <p className="mt-2 text-sm">
        {mode === "login" ? "No account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="text-teal-400 underline"
        >
          {mode === "login" ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;