import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <>
      <Header />
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h1>📞 Contact Us</h1>
        <p>We’d love to hear from you. Reach us anytime:</p>

        <ul>
          <li>Email: <a href="mailto:tmukisa031@gmail.com">tmukisa031@gmail.com</a></li>
          <li>Phone: <a href="tel:+256702802338">+256 702 802338</a></li>
          <li>Website: <a href="https://www.titusmukisa.com.free" target="_blank">www.titusmukisa.com.free</a></li>
        </ul>

        <form style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem', maxWidth: '400px' }}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </main>
      <Footer />
    </>
  );
}