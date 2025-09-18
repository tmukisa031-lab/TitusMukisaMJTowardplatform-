import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Universal Media Hub</h1>
      <nav>
        <Link to="/media">Browse Media</Link> |{" "}
        <Link to="/subscribe">Subscriptions</Link>
      </nav>
    </div>
  );
}

export default HomePage;