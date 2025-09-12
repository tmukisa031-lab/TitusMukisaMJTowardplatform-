import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Link from "next/link";
import "../styles/global.css";

export default function ControlPad() {
  return (
    <>
      <Header />
      <Navbar />
      <main className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Control Panel</h2>
        <p className="mb-4">
          Manage platform settings, access AI tools, media, storefront, and review statistics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin" className="card p-4 shadow rounded bg-white text-center hover:bg-blue-50">
            <h3>Admin Dashboard</h3>
            <p>Manage users, content, approvals, and platform-wide settings.</p>
          </Link>

          <Link href="/ai-tools" className="card p-4 shadow rounded bg-white text-center hover:bg-blue-50">
            <h3>AI Tools</h3>
            <p>Access AI-powered utilities, experiments, and automated recommendations.</p>
          </Link>

          <Link href="/science" className="card p-4 shadow rounded bg-white text-center hover:bg-blue-50">
            <h3>Science Hub</h3>
            <p>Use calculators, chemistry tools, and scientific resources.</p>
          </Link>

          <Link href="/storefront" className="card p-4 shadow rounded bg-white text-center hover:bg-blue-50">
            <h3>Storefront</h3>
            <p>
              View and manage products, enable Auto Pricing, handle free items, offers, and subscriptions.
            </p>
          </Link>

          <Link href="/media" className="card p-4 shadow rounded bg-white text-center hover:bg-blue-50">
            <h3>Media Center</h3>
            <p>
              Access videos, audio, and downloadable media content. Free samples available for visitors.
            </p>
          </Link>

          <Link href="/controlpad-settings" className="card p-4 shadow rounded bg-white text-center hover:bg-blue-50">
            <h3>Settings & Preferences</h3>
            <p>
              Customize platform behavior, toggles for Auto Pricing, notifications, and offers management.
            </p>
          </Link>
        </div>

        <section className="mt-6 p-4 border rounded bg-yellow-100">
          <h3 className="font-semibold">Quick Features</h3>
          <ul className="list-disc pl-5">
            <li>Auto Pricing toggle for all products</li>
            <li>Free sample and promotional content management</li>
            <li>AI-assisted product recommendations</li>
            <li>Media and file access management</li>
            <li>Subscription, discount, and offer management</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}