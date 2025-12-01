import React, { useState, useEffect } from 'react';

function App() {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');

  // 1. Fetch data from backend
  useEffect(() => {
    fetch('http://localhost:5001/snippets')
      .then(res => res.json())
      .then(data => setSnippets(data))
      .catch(err => console.error("Error fetching:", err));
  }, []);

  // 2. Save data to backend
  const addSnippet = async () => {
    if(!title || !code) return;
    
    await fetch('http://localhost:5001/snippets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, code })
    });

    // Refresh the list
    const res = await fetch('http://localhost:5001/snippets');
    const data = await res.json();
    setSnippets(data);
    setTitle('');
    setCode('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>SnippetStash 🐳</h1>
      <p>Your DevOps Cheat Sheet</p>
      
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <input 
          placeholder="Title (e.g., Docker Run)" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
        />
        <br />
        <textarea 
          placeholder="Paste your code/command here..." 
          value={code} 
          onChange={e => setCode(e.target.value)} 
          style={{ width: '100%', height: '80px', marginBottom: '10px', padding: '5px' }}
        />
        <br />
        <button onClick={addSnippet} style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Save Snippet
        </button>
      </div>

      <h2>My Saved Snippets</h2>
      {snippets.map(s => (
        <div key={s._id} style={{ background: '#f4f4f4', borderLeft: '5px solid #007bff', margin: '10px 0', padding: '10px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>{s.title}</h3>
          <pre style={{ background: '#333', color: '#fff', padding: '10px', borderRadius: '5px' }}>{s.code}</pre>
        </div>
      ))}
    </div>
  );
}

export default App;