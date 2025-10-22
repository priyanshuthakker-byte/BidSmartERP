'use client'
import { useState } from 'react'

type Tender = {
  number: string
  description: string
  emd: string
  preBid: string
  lastQueryDate: string
  submissionDate: string
  consortium: string
  evaluation: string
  preQual: string
  techQual: string
  scope: string
}

const tenders: Tender[] = [
  {
    number: 'GEM/2025/B/123456',
    description: 'Development of Smart City Dashboard',
    emd: '₹50,000',
    preBid: '25-Oct-2025, 3:00 PM, Online',
    lastQueryDate: '24-Oct-2025',
    submissionDate: '30-Oct-2025',
    consortium: 'Yes',
    evaluation: 'QCBS',
    preQual: '3 similar projects, ₹1 Cr turnover',
    techQual: 'Dashboard, GIS, Mobile App',
    scope: 'Design, Develop, Deploy, Maintain for 3 years',
  },
  {
    number: 'GEM/2025/B/654321',
    description: 'ERP for Municipal Tender Management',
    emd: '₹75,000',
    preBid: '26-Oct-2025, 11:00 AM, Offline',
    lastQueryDate: '25-Oct-2025',
    submissionDate: '31-Oct-2025',
    consortium: 'No',
    evaluation: 'Least Cost',
    preQual: '2 ERP projects, ₹50L turnover',
    techQual: 'Tender, BOQ, HR, Workflow',
    scope: 'Full ERP with mobile view and audit-safe logs',
  },
]

export default function BossModule() {
  const [selected, setSelected] = useState<number | null>(null)
  const [editable, setEditable] = useState<Tender | null>(null)

  const handleSelect = (index: number) => {
    setSelected(index)
    setEditable({ ...tenders[index] })
  }

  const handleChange = (field: keyof Tender, value: string) => {
    if (editable) {
      setEditable({ ...editable, [field]: value })
    }
  }

  const highlightClause = (text: string) => {
    const keywords = ['consortium', 'QCBS', 'experience', 'scope', 'turnover']
    return keywords.some(k => text.toLowerCase().includes(k)) ? '🔍 ' + text : text
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <h2>Boss Module: Tender Summary</h2>
      <select
        onChange={e => handleSelect(parseInt(e.target.value))}
        style={{ padding: 10, marginBottom: 20, width: '100%' }}
      >
        <option value="">Select a Tender</option>
        {tenders.map((t, i) => (
          <option key={i} value={i}>
            {t.number}
          </option>
        ))}
      </select>

      {editable && (
        <div style={{ overflowX: 'auto' }}>
          <table border={1} cellPadding={10} style={{ width: '100%', fontSize: 14 }}>
            <tbody>
              {Object.entries(editable).map(([key, value]) => (
                <tr key={key}>
                  <td><b>{key}</b></td>
                  <td>
                    <input
                      value={value}
                      onChange={e => handleChange(key as keyof Tender, e.target.value)}
                      style={{ width: '100%', padding: 6 }}
                    />
                    <div style={{ fontSize: 12, color: '#555' }}>
                      {highlightClause(value)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            style={{
              marginTop: 20,
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              width: '100%',
            }}
            onClick={() => alert('Daily Digest PDF will be generated here')}
          >
            Generate Daily Digest PDF
          </button>
        </div>
      )}
    </div>
  )
}