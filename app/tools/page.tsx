'use client'
import { useState } from 'react'

type FileEntry = {
  name: string
  type: string
  tag: string
}

type Reminder = {
  title: string
  date: string
}

type Result = {
  tender: string
  submitted: string
  result: string
  reason: string
}

export default function ToolsPage() {
  const [files, setFiles] = useState<FileEntry[]>([])
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [results, setResults] = useState<Result[]>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = Array.from(e.target.files || []).map(file => ({
      name: file.name,
      type: file.type,
      tag: 'Uncategorized',
    }))
    setFiles(prev => [...prev, ...uploaded])
  }

  const handleTagChange = (index: number, tag: string) => {
    const updated = [...files]
    updated[index].tag = tag
    setFiles(updated)
  }

  const addReminder = () => {
    const title = prompt('Reminder title?')
    const date = prompt('Reminder date (YYYY-MM-DD)?')
    if (title && date) setReminders(prev => [...prev, { title, date }])
  }

  const addResult = () => {
    const tender = prompt('Tender Number?')
    const submitted = prompt('Submission Date?')
    const result = prompt('Result (Won/Lost)?')
    const reason = prompt('Reason or Notes?')
    if (tender && submitted && result && reason)
      setResults(prev => [...prev, { tender, submitted, result, reason }])
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
        <h2>📁 Document Vault</h2>
        <input type="file" multiple onChange={handleFileUpload} style={{ marginBottom: 10 }} />
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Tag</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f, i) => (
              <tr key={i}>
                <td style={tdStyle}>{f.name}</td>
                <td style={tdStyle}>{f.type}</td>
                <td style={tdStyle}>
                  <input
                    value={f.tag}
                    onChange={e => handleTagChange(i, e.target.value)}
                    style={{ width: '100%', padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={cardStyle}>
        <h2>⏰ Reminder System</h2>
        <button
          onClick={addReminder}
          style={{ padding: '8px 16px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: 6 }}
        >
          Add Reminder
        </button>
        <ul style={{ marginTop: 10 }}>
          {reminders.map((r, i) => (
            <li key={i} style={{ padding: '6px 0' }}>{r.title} — <b>{r.date}</b></li>
          ))}
        </ul>
      </div>

      <div style={cardStyle}>
        <h2>📊 Win/Loss Tracker</h2>
        <button
          onClick={addResult}
          style={{ padding: '8px 16px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: 6 }}
        >
          Add Result
        </button>
        <table style={{ ...tableStyle, marginTop: 10 }}>
          <thead>
            <tr>
              <th style={thStyle}>Tender</th>
              <th style={thStyle}>Submitted</th>
              <th style={thStyle}>Result</th>
              <th style={thStyle}>Reason</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td style={tdStyle}>{r.tender}</td>
                <td style={tdStyle}>{r.submitted}</td>
                <td style={tdStyle}>{r.result}</td>
                <td style={tdStyle}>{r.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}