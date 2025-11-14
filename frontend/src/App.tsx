import { useState, useEffect } from 'react'
import './App.css'

interface ApiInfo {
  name: string;
  version: string;
  description: string;
}

function App() {
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, AlphaClone Systems!");')
  const [language, setLanguage] = useState('javascript')
  const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null)
  const [output, setOutput] = useState('')

  useEffect(() => {
    // Fetch API info on mount
    fetch('http://localhost:3001/api/info')
      .then(res => res.json())
      .then(data => setApiInfo(data))
      .catch(err => console.error('Error fetching API info:', err))
  }, [])

  const handleExecute = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/code/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      })
      const data = await response.json()
      setOutput(JSON.stringify(data, null, 2))
    } catch (error) {
      setOutput('Error connecting to backend: ' + error)
    }
  }

  const handleAnalyze = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/code/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
      const data = await response.json()
      setOutput(JSON.stringify(data, null, 2))
    } catch (error) {
      setOutput('Error connecting to backend: ' + error)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚀 AlphaClone Systems</h1>
        <p>A Fullstack Vibe Coding App</p>
        {apiInfo && <div className="api-info">Connected to {apiInfo.name} v{apiInfo.version}</div>}
      </header>

      <div className="main-content">
        <div className="editor-section">
          <div className="controls">
            <label htmlFor="language-select">Language:</label>
            <select 
              id="language-select"
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="typescript">TypeScript</option>
              <option value="java">Java</option>
            </select>
          </div>

          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
          />

          <div className="action-buttons">
            <button onClick={handleExecute} className="btn btn-primary">
              ▶️ Execute Code
            </button>
            <button onClick={handleAnalyze} className="btn btn-secondary">
              🔍 Analyze Code
            </button>
          </div>
        </div>

        <div className="output-section">
          <h3>Output</h3>
          <pre className="output-display">{output || 'Run your code to see output here...'}</pre>
        </div>
      </div>

      <footer className="app-footer">
        <p>Built with React, TypeScript, Node.js & Express</p>
      </footer>
    </div>
  )
}

export default App
