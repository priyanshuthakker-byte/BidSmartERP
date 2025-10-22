'use client'
import { useState } from 'react'

type Company = 'Nascent Info Technologies' | 'Arctic Experts Pvt. Ltd.'
type TenderDigest = {
  number: string
  description: string
  submissionDate: string
  evaluation: string
  clauseNotes: string
  status: 'Draft' | 'Submitted' | 'Won' | 'Lost'
}

const data: Record<Company, TenderDigest[]> = {
  'Nascent Info Technologies': [
    {
      number: 'GEM/2025/B/123456',
      description: 'Smart City Dashboard',
      submissionDate: '30-Oct-2025',
      evaluation: 'QCBS',
      clauseNotes: 'Consortium allowed, 3 similar projects, GIS scope',
      status: 'Submitted',
    },
    {
      number: 'GEM/2025/B/789012',
      description: 'Tender Monitoring Portal',
      submissionDate: '02-Nov-2025',
      evaluation: 'Least Cost',
      clauseNotes: 'No consortium, BOQ required, portal + dashboard experience',
      status: 'Draft',
    },
  ],
  'Arctic Experts Pvt. Ltd.': [
    {
      number: 'GEM/2025/B/654321',
      description: 'Municipal ERP System',
      submissionDate: '31-Oct-2025',
      evaluation: 'Least Cost',
      clauseNotes: 'ERP experience, mobile audit logs, no consortium',
      status: 'Won',
    },
  ],
}

export default function DigestPage() {
  const [company, setCompany] = useState<Company>('Nascent Info Technologies')

  const generatePDF = async () => {
    const payload = {
      company,
      tenders: data[company],
    }

    const res = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${company}-digest.pdf`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const cardStyle = {
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: 20,
    marginBottom: 30,
  }

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: 14,
  }

  const thStyle = {
    background: '#f5f5f5',
    textAlign: 'left' as const,
    padding: 10,
    borderBottom: '1px solid #ddd',
  }

  const tdStyle = {
    padding: 10,
    borderBottom: '1px solid #eee',
  }

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: 'auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={cardStyle}>
        <h2>📄 Daily Digest Generator</h2>
        <select
          value={company}
          onChange={e => setCompany(e.target.value as Company)}
          style={{ padding: 10, width: '100%', marginBottom: 20 }}
        >
          <option value="Nascent Info Technologies">Nascent Info Technologies</option>
          <option value="Arctic Experts Pvt. Ltd.">Arctic Experts Pvt. Ltd.</option>
        </select>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Tender</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Submission</th>
              <th style={thStyle}>Evaluation</th>
              <th style={thStyle}>Clause Notes</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data[company].map((t, i) => (
              <tr key={i}>
                <td style={tdStyle}>{t.number}</td>
                <td style={tdStyle}>{t.description}</td>
                <td style={tdStyle}>{t.submissionDate}</td>
                <td style={tdStyle}>{t.evaluation}</td>
                <td style={tdStyle}>{t.clauseNotes}</td>
                <td style={tdStyle}><b>{t.status}</b></td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={generatePDF}
          style={{
            marginTop: 20,
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            width: '100%',
          }}
        >
          Generate PDF Digest
        </button>
      </div>

      <div style={{
        background: '#f9f9f9',
        borderRadius: 12,
        padding: 20,
        fontSize: 13,
        color: '#333',
      }}>
        <h3>📱 Mobile Digest View</h3>
        <p><b>Company:</b> {company}</p>
        {data[company].map((t, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <p><b>{t.number}</b> — {t.description}</p>
            <p><i>Submit by {t.submissionDate} | {t.evaluation}</i></p>
            <p style={{ color: '#555' }}>🔍 {t.clauseNotes}</p>
            <p>Status: <b>{t.status}</b></p>
          </div>
        ))}
      </div>
    </div>
  )
}