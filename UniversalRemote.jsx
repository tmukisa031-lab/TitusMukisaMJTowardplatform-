import React from "react";

function UniversalRemote({ onPlay, onPause, onStop }) {
  return (
    <div style={{ margin: "20px 0" }}>
      <h3>🎛️ Universal Remote</h3>
      <button onClick={onPlay}>▶ Play</button>
      <button onClick={onPause}>⏸ Pause</button>
      <button onClick={onStop}>⏹ Stop</button>
    </div>
  );
}

export default UniversalRemote;