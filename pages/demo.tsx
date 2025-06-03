import { useState } from 'react'

export default function Demo() {
  const [status, setStatus] = useState('')

  const handleClick = async () => {
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })

    const data = await res.json()
    if (data.success) setStatus('✅ Bot triggered successfully!')
    else setStatus('❌ Something went wrong.')
  }

  return (
    <main className="p-8 text-white bg-black min-h-screen">
      <h1 className="text-3xl mb-4">🎯 Fasttrk Demo</h1>
      <button onClick={handleClick} className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-800">
        Trigger Test Bot Call
      </button>
      <p className="mt-4">{status}</p>
    </main>
  )
}
