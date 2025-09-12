import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>TitusMukisaMJToward Platform</title>
        <meta name="description" content="Unified AI-powered platform for books, media, science, and more." />
      </Head>

      <Header />
      <Navbar />

      {/* Hero Section */}
      <section className="hero text-center p-8 bg-gradient-to-b from-gray-100 to-blue-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to TitusMukisaMJToward</h1>
        <p className="text-lg mb-6">Your hub for books, science, media, and AI-powered tools.</p>
        <Link href="/about" className="btn bg-blue-600 text-white px-4 py-2 rounded">Explore About</Link>
      </section>

      {/* Cards Section */}
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-4 shadow rounded bg-white">
          <h3 className="text-xl font-semibold">📚 Books & Stories</h3>
          <p>Explore ebooks like <em>The Starlife</em> and <em>The Listener</em>.</p>
          <Link href="/storefront" className="btn text-blue-600 mt-2 inline-block">Visit Library</Link>
        </div>

        <div className="card p-4 shadow rounded bg-white">
          <h3 className="text-xl font-semibold">🎬 Media Hub</h3>
          <p>Access movies, series, and audio collections.</p>
          <Link href="/media" className="btn text-blue-600 mt-2 inline-block">Go to Media</Link>
        </div>

        <div className="card p-4 shadow rounded bg-white">
          <h3 className="text-xl font-semibold">🔬 Science</h3>
          <p>Use calculators, experiments, and AI-powered science tools.</p>
          <Link href="/science" className="btn text-blue-600 mt-2 inline-block">Science Tools</Link>
        </div>
      </div>

      {/* Media Player Section */}
      <div className="media-player text-center bg-gray-800 p-6 mt-6">
        <h2 className="text-white text-2xl mb-4">🎧 Featured Media</h2>
        <video id="videoPlayer" controls className="mx-auto w-full max-w-md rounded">
          <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="control-bar mt-4 space-x-4">
          <button onClick={() => document.getElementById('videoPlayer').play()}>▶ Play</button>
          <button onClick={() => document.getElementById('videoPlayer').pause()}>⏸ Pause</button>
          <button onClick={() => {
            let vid = document.getElementById('videoPlayer');
            vid.currentTime = 0;
            vid.pause();
          }}>⏹ Stop</button>
        </div>
      </div>

      <Footer />
    </>
  );
}