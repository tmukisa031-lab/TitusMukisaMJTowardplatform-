import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>TitusMukisaMJToward Platform</title>
        <meta name="description" content="Unified AI-powered platform for books, media, science, and more." />
      </Head>

      <section className="hero">
        <h1>Welcome to TitusMukisaMJToward</h1>
        <p>Your hub for books, science, media, and AI-powered tools.</p>
        <Link href="/about" className="btn">Explore About</Link>
      </section>

      <div className="container">
        <div className="card-grid">
          <div className="card">
            <h3>📚 Books & Stories</h3>
            <p>Explore ebooks like <em>The Starlife</em> and <em>The Listener</em>.</p>
            <Link href="/library" className="btn">Visit Library</Link>
          </div>

          <div className="card">
            <h3>🎬 Media Hub</h3>
            <p>Access movies, series, and audio collections.</p>
            <Link href="/media" className="btn">Go to Media</Link>
          </div>

          <div className="card">
            <h3>🔬 Science</h3>
            <p>Use calculators, experiments, and AI-powered science tools.</p>
            <Link href="/science" className="btn">Science Tools</Link>
          </div>
        </div>

        <div className="media-player">
          <h2 style={{ color: "#fff" }}>🎧 Featured Media</h2>
          <video id="videoPlayer" controls poster="/logo.png">
            <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="control-bar">
            <button onClick={() => document.getElementById('videoPlayer').play()}>▶ Play</button>
            <button onClick={() => document.getElementById('videoPlayer').pause()}>⏸ Pause</button>
            <button onClick={() => {
              let vid = document.getElementById('videoPlayer');
              vid.currentTime = 0;
              vid.pause();
            }}>⏹ Stop</button>
          </div>
        </div>
      </div>
    </>
  );
}