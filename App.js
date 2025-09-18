import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AuthForm from "./components/AuthForm";
import MediaList from "./components/MediaList";
import SubscribeButton from "./components/SubscribeButton";

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 flex justify-between items-center bg-gray-800">
        <h1 className="text-xl font-bold text-teal-400">Universal Media Hub</h1>
        {user ? (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        ) : null}
      </header>

      {!user ? (
        <AuthForm />
      ) : (
        <>
          <SubscribeButton />
          <MediaList />
        </>
      )}
    </div>
  );
}

export default App;