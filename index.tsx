import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fasttrk Connect</title>
      </Head>
      <main>
        <h1>Welcome to Fasttrk Connect</h1>
        <p>This is your dynamic AI verification bot interface. Ready to plug into n8n.</p>
        <form method="POST" action="/api/verify">
          <input name="name" placeholder="Name" required />
          <input name="email" placeholder="Email" required />
          <input name="vehicle" placeholder="Vehicle" required />
          <button type="submit">Trigger Bot</button>
        </form>
      </main>
    </div>
  );
}