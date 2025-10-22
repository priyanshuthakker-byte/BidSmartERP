'use client'
import { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'

type Role = 'boss' | 'executive' | 'viewer'
type Status = 'Won' | 'Lost' | 'Pending'

const getUserRole = (): Role => {
  const token = localStorage.getItem('authToken')
  if (!token) return 'viewer'
  const decoded: any = jwtDecode(token)
  return decoded.role || 'viewer'
}

const tabs = ['Clause Score', 'Clone Script', 'Status Tracker', 'Document Vault']
const workOrders = [
  { number: 'WO-001', scope: 'Smart City', experience: 'GIS', consortium: 'Yes', evaluation: 'QCBS', status: 'Won' },
  { number: 'WO-002', scope: 'ERP', experience: 'Audit Logs', consortium: 'No', evaluation: 'Least Cost', status: 'Lost' },
]

export default function DashboardPage() {
  const role = getUserRole()
  const [tab, setTab] = useState('Clause Score')
  const [pdfText, setPdfText] = useState('')
  const [search, setSearch] = useState('')
  const [vault, setVault] = useState<string[]>([])
  const [statusData, setStatusData] = useState<Record<Status, number>>({ Won: 0, Lost: 0, Pending: 0 })

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
    }
    const counts = { Won: 0, Lost: 0, Pending: 0 }
    workOrders.forEach(w => counts[w.status as Status]++)
    setStatusData(counts)
  }, [])

  const handlePDFUpload = async (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = reader.result?.toString().split(',')[1]
      const res = await fetch('/api/parse-clause', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdf: base64 }),
      })
      const data = await res.json()
      setPdfText(JSON.stringify(data, null, 2))
    }
    reader.readAsDataURL(file)
  }

  const handleVaultUpload = (e: any) => {
    const file = e.target.files[0]
    setVault(prev => [...prev, file.name])
  }

  if (role === 'viewer') return <div style={{ padding: 40 }}>Access Denied</div>

  return (
    <div style={{ padding: 20, fontFamily: 'Segoe UI, sans-serif' }}>
      <h2>🔐 Role: {role.toUpperCase()}</h2>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: 10, background: tab === t ? '#0070f3' : '#eee', color: tab === t ? '#fff' : '#000' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Clause Score' && (
        <>
          <h3>🧠 AI Clause Scoring</h3>
          <input type="file" accept="application/pdf" onChange={handlePDFUpload} />
          {pdfText && <pre style={{ whiteSpace: 'pre-wrap', marginTop: 10 }}>{pdfText}</pre>}
        </>
      )}

      {tab === 'Clone Script' && (
        <>
          <h3>📦 One-Click Clone Script</h3>
          <pre style={{ background: '#f4f4f4', padding: 10 }}>
            git clone https://github.com/your-org/BidSmartERP{"\n"}
            cd BidSmartERP{"\n"}
            npm install{"\n"}
            vercel deploy --prod
          </pre>
        </>
      )}

      {tab === 'Status Tracker' && (
        <>
          <h3>📊 Win/Loss Tracker</h3>
          <ul>
            <li>Won: {statusData.Won}</li>
            <li>Lost: {statusData.Lost}</li>
            <li>Pending: {statusData.Pending}</li>
          </ul>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
            <thead>
              <tr>
                <th>Number</th><th>Scope</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((w, i) => (
                <tr key={i}>
                  <td>{w.number}</td><td>{w.scope}</td><td>{w.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === 'Document Vault' && (
        <>
          <h3>📁 Upload to Vault</h3>
          <input type="file" onChange={handleVaultUpload} />
          <ul style={{ marginTop: 10 }}>
            {vault.map((v, i) => (
              <li key={i}>{v} ✅</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}