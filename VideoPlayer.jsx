import React from "react";

function VideoPlayer({ src }) {
  return (
    <div>
      <h3>🎬 Video Player</h3>
      <video width="100%" height="400" controls>
        <source src={src} type="video/mp4" />
        Your browser does not support video playback.
      </video>
    </div>
  );
}

export default VideoPlayer;