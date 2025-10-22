// Trigger redeploy for login setup
// 'use client';
import React, { useState } from 'react';

export default function PortalManager() {
  const [portals, setPortals] = useState([
    { name: 'GeM', url: 'https://gem.gov.in', selected: true },
    { name: 'eProcure', url: 'https://eprocure.gov.in', selected: false },
    { name: 'TenderTiger', url: 'https://www.tendertiger.com', selected: true },
    { name: 'TenderDetail', url: 'https://www.tenderdetail.com', selected: false },
    { name: 'TendersOnTime', url: 'https://www.tendersontime.com', selected: false },
    { name: 'MSTC', url: 'https://www.mstcecommerce.com', selected: false },
    { name: 'NICSI', url: 'https://nicsi.gov.in', selected: false }
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [keywords, setKeywords] = useState('MIS, ERP, HRMS, eGovernance, Invoice, Vendor, Outsourcing');
  const [categories, setCategories] = useState('Information Technology, Software Development, Smart City');
  const [tenders, setTenders] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  function toggleSelectAll() {
    const newState = !selectAll;
    setSelectAll(newState);
    setPortals(portals.map(p => ({ ...p, selected: newState })));
  }

  function togglePortal(index: number) {
    const updated = [...portals];
    updated[index].selected = !updated[index].selected;
    setPortals(updated);
    setSelectAll(updated.every(p => p.selected));
  }

  async function fetchTenders() {
    const activePortals = portals.filter(p => p.selected);
    const targets = activePortals.length > 0 ? activePortals : portals;

    const res = await fetch('/api/fetch-tenders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        portals: targets,
        keywords: keywords.split(',').map(k => k.trim()),
        categories: categories.split(',').map(c => c.trim())
      })
    });

    const data = await res.json();
    setTenders(data.tenders);
  }

  function handleChatSubmit() {
    const input = chatInput.toLowerCase();
    if (input.includes('fetch')) {
      fetchTenders();
      setChatResponse('Fetching tenders now...');
    } else if (input.includes('keywords')) {
      setChatResponse(`Current keywords: ${keywords}`);
    } else if (input.includes('categories')) {
      setChatResponse(`Current categories: ${categories}`);
    } else {
      setChatResponse('I can help with fetching, keywords, categories, or portal selection.');
    }
    setChatInput('');
  }

  return (
    <main className="max-w-5xl mx-auto p-6 font-sans grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <h1 className="text-3xl font-bold text-center mb-6">Auto-Fetcher Portal Manager</h1>

        <section className="card fade-in mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Portals</h2>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
              <span>Select All</span>
            </label>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-3 py-2">Select</th>
                <th className="border px-3 py-2">Portal Name</th>
                <th className="border px-3 py-2">Website URL</th>
              </tr>
            </thead>
            <tbody>
              {portals.map((p, i) => (
                <tr key={i}>
                  <td className="border px-3 py-2 text-center">
                    <input type="checkbox" checked={p.selected} onChange={() => togglePortal(i)} />
                  </td>
                  <td className="border px-3 py-2">{p.name}</td>
                  <td className="border px-3 py-2">{p.url}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card fade-in mb-6">
          <h2 className="text-xl font-semibold mb-2">Global Keywords</h2>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
          />
        </section>

        <section className="card fade-in mb-6">
          <h2 className="text-xl font-semibold mb-2">Global Categories</h2>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={categories}
            onChange={e => setCategories(e.target.value)}
          />
        </section>

        <section className="card fade-in mb-6">
          <button className="button w-full" onClick={fetchTenders}>
            Fetch Tenders from Selected
          </button>
        </section>

        <section className="card fade-in">
          <h2 className="text-xl font-semibold mb-2">Fetched Tenders</h2>
          {tenders.length === 0 ? (
            <p>No tenders fetched yet.</p>
          ) : (
            <ul className="list-disc pl-5">
              {tenders.map((t, i) => (
                <li key={i}>
                  <strong>{t.portal}</strong>: {t.workDescription} ({t.tenderNumber})
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="card fade-in col-span-1 h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-2">Chatbot Assistant</h2>
        <div className="flex-grow border p-3 rounded mb-2 overflow-y-auto">
          <p>{chatResponse}</p>
        </div>
        <input
          type="text"
          className="p-2 border rounded mb-2"
          placeholder="Ask something..."
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleChatSubmit()}
        />
        <button className="button" onClick={handleChatSubmit}>Send</button>
      </div>
    </main>
  );
}