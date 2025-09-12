import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminDashboard() {
  return (
    <>
      <Header />
      <Navbar />
      <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h2>Admin Dashboard</h2>
        <p>Manage platform content, approve uploads, and monitor users.</p>
        <p><em>Advanced functionality coming soon.</em></p>
      </main>
      <Footer />
    </>
  );
}