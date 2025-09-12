import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css';

export default function AboutPage() {
  return (
    <>
      <Header />
      <Navbar />

      <main className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">About TitusMukisaMJToward</h2>
        <p className="mb-4">
          This platform brings together digital books, science updates, media, and educational resources. It’s built to empower users with knowledge and interactive experiences.
        </p>
        <p>
          We are constantly updating the platform to include AI tools, virtual tours, talent showcases, and more. Stay tuned for the future!
        </p>
      </main>

      <Footer />
    </>
  );
}