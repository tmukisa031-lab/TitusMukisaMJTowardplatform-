import React from "react";

function RadioPlayer({ src }) {
  return (
    <div>
      <h3>📻 Radio Player</h3>
      <audio controls autoPlay>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the radio stream.
      </audio>
    </div>
  );
}

export default RadioPlayer;