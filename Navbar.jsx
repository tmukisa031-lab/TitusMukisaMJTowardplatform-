import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex justify-center space-x-6">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/library">Library</Link></li>
        <li><Link href="/media">Media</Link></li>
        <li><Link href="/science">Science</Link></li>
        <li><Link href="/about">About</Link></li>
      </ul>
    </nav>
  );
}