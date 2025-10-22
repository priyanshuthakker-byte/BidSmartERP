'use client'
import { useState } from 'react'

const tenders = [
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

  return (
    <div style={{ padding: 40 }}>
      <h2>Boss Module: Tender Summary</h2>
      <select
        onChange={e => setSelected(parseInt(e.target.value))}
        style={{ padding: 10, marginBottom: 20 }}
      >
        <option value="">Select a Tender</option>
        {tenders.map((t, i) => (
          <option key={i} value={i}>
            {t.number}
          </option>
        ))}
      </select>

      {selected !== null && (
        <table border={1} cellPadding={10} style={{ width: '100%', marginTop: 20 }}>
          <tbody>
            <tr><td><b>Tender Number</b></td><td>{tenders[selected].number}</td></tr>
            <tr><td><b>Work Description</b></td><td>{tenders[selected].description}</td></tr>
            <tr><td><b>EMD</b></td><td>{tenders[selected].emd}</td></tr>
            <tr><td><b>Pre-Bid Meeting</b></td><td>{tenders[selected].preBid}</td></tr>
            <tr><td><b>Last Date for Pre-Bid Queries</b></td><td>{tenders[selected].lastQueryDate}</td></tr>
            <tr><td><b>Due Date of Submission</b></td><td>{tenders[selected].submissionDate}</td></tr>
            <tr><td><b>Consortium Allowed</b></td><td>{tenders[selected].consortium}</td></tr>
            <tr><td><b>Method of Evaluation</b></td><td>{tenders[selected].evaluation}</td></tr>
            <tr><td><b>Pre-Qualification Criteria</b></td><td>{tenders[selected].preQual}</td></tr>
            <tr><td><b>Technical Qualification</b></td><td>{tenders[selected].techQual}</td></tr>
            <tr><td><b>Broad Scope of Work</b></td><td>{tenders[selected].scope}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  )
}