// pages/index.tsx

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to Fasttrk Connect</h1>
      <p>This is your dynamic AI verification bot interface. Ready to plug into n8n.</p>
      <form method="POST" action="/api/verify" style={{ marginTop: '1rem' }}>
        <input type="text" name="name" placeholder="Name" required style={{ marginRight: '1rem' }} />
        <input type="email" name="email" placeholder="Email" required style={{ marginRight: '1rem' }} />
        <input type="text" name="vehicle" placeholder="Vehicle" required style={{ marginRight: '1rem' }} />
        <button type="submit">Trigger Bot</button>
      </form>
    </div>
  );
}
