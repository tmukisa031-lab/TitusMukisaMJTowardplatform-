import React from "react";

function AudioPlayer({ src }) {
  return (
    <div>
      <h3>🎵 Audio Player</h3>
      <audio controls>
        <source src={src} type="audio/mp3" />
        Your browser does not support audio playback.
      </audio>
    </div>
  );
}

export default AudioPlayer;