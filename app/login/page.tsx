'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    await signIn('credentials', {
      username,
      password,
      callbackUrl: '/',
    })
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 40 }}>
      <h2>Login to BidSmartERP</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%', padding: 8 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%', padding: 8 }}
      />
      <button
        onClick={handleLogin}
        style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none' }}
      >
        Login
      </button>
    </div>
  )
}