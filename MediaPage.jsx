import React, { useEffect, useState, useRef } from "react";
import api from "../services/api";
import TVPlayer from "../components/TVPlayer";
import RadioPlayer from "../components/RadioPlayer";
import AudioPlayer from "../components/AudioPlayer";
import VideoPlayer from "../components/VideoPlayer";
import UniversalRemote from "../components/UniversalRemote";

function MediaPage() {
  const [mediaList, setMediaList] = useState([]);
  const playerRef = useRef(null);

  useEffect(() => {
    api.get("/media").then((res) => setMediaList(res.data));
  }, []);

  const handlePlay = () => playerRef.current?.play();
  const handlePause = () => playerRef.current?.pause();
  const handleStop = () => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.currentTime = 0;
    }
  };

  return (
    <div>
      <h2>Media Library</h2>
      <UniversalRemote onPlay={handlePlay} onPause={handlePause} onStop={handleStop} />

      {mediaList.map((item) => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          {item.type === "tv" && <TVPlayer src={item.url} ref={playerRef} />}
          {item.type === "radio" && <RadioPlayer src={item.url} ref={playerRef} />}
          {item.type === "audio" && <AudioPlayer src={item.url} ref={playerRef} />}
          {item.type === "video" && <VideoPlayer src={item.url} ref={playerRef} />}
        </div>
      ))}
    </div>
  );
}

export default MediaPage;