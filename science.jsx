import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css';

export default function SciencePage() {
  return (
    <>
      <Header />
      <Navbar />

      <main className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Science & Technology</h2>
        <p className="mb-4">
          Explore the latest updates in astronomy, climate, wildlife, inventions, and discoveries.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>🌍 Climate & Environment News</li>
          <li>✨ Astronomy & Space Updates</li>
          <li>🧪 Latest Scientific Findings</li>
          <li>⚡ New Technologies & Inventions</li>
        </ul>
      </main>

      <Footer />
    </>
  );
}