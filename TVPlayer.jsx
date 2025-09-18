import React from "react";

function TVPlayer({ src }) {
  return (
    <div>
      <h3>📺 TV Player</h3>
      <video width="100%" height="400" controls autoPlay>
        <source src={src} type="application/x-mpegURL" />
        Your browser does not support live TV streaming.
      </video>
    </div>
  );
}

export default TVPlayer;