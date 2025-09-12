import Head from 'next/head';

export default function Storefront() {
  return (
    <>
      <Head>
        <title>Storefront - TitusMukisaMJToward</title>
      </Head>
      <header>
        <h1>Storefront</h1>
      </header>
      <main>
        <section>
          <h2>Our Products</h2>
          <ul>
            <li>The Listener [A Story About The Man] - UGX 35,000</li>
            <li>The Starlife (Astronomical Book) - USD 15</li>
            <li>The Tales Man Art - UGX 30,000</li>
          </ul>
          <p><em>(Payment integration coming soon)</em></p>
        </section>
      </main>
    </>
  );
}