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

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: 'auto' }}>
      <h2>📁 Document Vault</h2>
      <input type="file" multiple onChange={handleFileUpload} />
      <table border={1} cellPadding={8} style={{ marginTop: 10, width: '100%' }}>
        <thead>
          <tr><th>Name</th><th>Type</th><th>Tag</th></tr>
        </thead>
        <tbody>
          {files.map((f, i) => (
            <tr key={i}>
              <td>{f.name}</td>
              <td>{f.type}</td>
              <td>
                <input
                  value={f.tag}
                  onChange={e => handleTagChange(i, e.target.value)}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 40 }}>⏰ Reminder System</h2>
      <button onClick={addReminder} style={{ marginBottom: 10 }}>Add Reminder</button>
      <ul>
        {reminders.map((r, i) => (
          <li key={i}>{r.title} — {r.date}</li>
        ))}
      </ul>

      <h2 style={{ marginTop: 40 }}>📊 Win/Loss Tracker</h2>
      <button onClick={addResult} style={{ marginBottom: 10 }}>Add Result</button>
      <table border={1} cellPadding={8} style={{ width: '100%' }}>
        <thead>
          <tr><th>Tender</th><th>Submitted</th><th>Result</th><th>Reason</th></tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{r.tender}</td>
              <td>{r.submitted}</td>
              <td>{r.result}</td>
              <td>{r.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
