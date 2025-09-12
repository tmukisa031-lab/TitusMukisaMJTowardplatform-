import Link from 'next/link';
import '../styles/global.css';

export default function Layout({ children }) {
  return (
    <>
      <header>
        <img
          src="/logo-placeholder.png"
          alt="TitusMukisaMJToward Logo"
          className="logo"
        />
        <h1>TitusMukisaMJToward Platform</h1>
        <nav>
          <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/chemistry-calculator"><a>Chemistry Calculator</a></Link></li>
            <li><Link href="/ai-tools"><a>AI Tools</a></Link></li>
            <li><Link href="/media"><a>Media Center</a></Link></li>
            <li><Link href="/learning"><a>Learning Hub</a></Link></li>
            <li><Link href="/storefront"><a>Storefront</a></Link></li>
            <li><Link href="/admin"><a>Admin Dashboard</a></Link></li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <p>
          © 2025 TitusMukisaMJToward | Email: <a href="mailto:tmukisa031@gmail.com">tmukisa031@gmail.com</a> | Phone: <a href="tel:+256702802338">+256702802338</a>
        </p>
      </footer>
    </>
  );
}