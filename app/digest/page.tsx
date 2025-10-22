'use client'
import { useState } from 'react'

type Company = 'Nascent Info Technologies' | 'Arctic Experts Pvt. Ltd.'
type TenderDigest = {
  number: string
  description: string
  submissionDate: string
  evaluation: string
  clauseNotes: string
}

const data: Record<Company, TenderDigest[]> = {
  'Nascent Info Technologies': [
    {
      number: 'GEM/2025/B/123456',
      description: 'Smart City Dashboard',
      submissionDate: '30-Oct-2025',
      evaluation: 'QCBS',
      clauseNotes: 'Consortium allowed, 3 similar projects, GIS scope',
    },
    {
      number: 'GEM/2025/B/789012',
      description: 'Tender Monitoring Portal',
      submissionDate: '02-Nov-2025',
      evaluation: 'Least Cost',
      clauseNotes: 'Experience in portal + dashboard, no consortium, BOQ required',
    },
  ],
  'Arctic Experts Pvt. Ltd.': [
    {
      number: 'GEM/2025/B/654321',
      description: 'Municipal ERP System',
      submissionDate: '31-Oct-2025',
      evaluation: 'Least Cost',
      clauseNotes: 'No consortium, ERP experience required, mobile audit logs',
    },
  ],
}

export default function DigestPage() {
  const [company, setCompany] = useState<Company>('Nascent Info Technologies')

  const generatePDF = () => {
    alert(`PDF Digest for ${company} will be generated here.`)
    // Future: trigger backend API to generate and download PDF
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
          </div>
        ))}
      </div>
    </div>
  )
}