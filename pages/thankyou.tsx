import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ThankYou() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [router]);

  return (
    <div style={{
      backgroundColor: '#0f0f0f',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#00f2ff',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1>
        Thank you! We are verifying your insurance now.
        <br />
        You will be contacted shortly with the status.
        <br />
        <span style={{ fontSize: '0.8em', marginTop: '20px', display: 'block' }}>
          Redirecting back to form shortly...
        </span>
      </h1>
    </div>
  );
}
