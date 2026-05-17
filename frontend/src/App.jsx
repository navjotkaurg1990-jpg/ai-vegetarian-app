import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Scanner from './components/Scanner';
import ResultsDisplay from './components/ResultsDisplay';
import Auth from './components/Auth';
import { Leaf, LogOut } from 'lucide-react';

function App() {
  const { currentUser, logout } = useAuth();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async ({ type, payload }) => {
    setLoading(true);
    setResults(null);
    try {
      const formData = new FormData();
      let url = '';
      
      if (type === 'image') {
        formData.append('file', payload);
        url = 'http://localhost:8000/api/analyze/image';
      } else {
        url = 'http://localhost:8000/api/analyze/text';
      }

      const options = {
        method: 'POST',
        body: type === 'image' ? formData : JSON.stringify({ text: payload }),
      };

      if (type === 'text') {
        options.headers = {
          'Content-Type': 'application/json'
        };
      }

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <Auth />;
  }

  return (
    <>
      <header>
        <h1><Leaf color="var(--primary)" /> PureBite</h1>
        <p>AI-Powered Vegetarian & Vegan Food Detector</p>
        <button 
          onClick={logout} 
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', color: 'var(--text-light)', border: '1px solid #ccc' }}
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="container">
        <Scanner onAnalyze={handleAnalyze} loading={loading} />
        
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Claude is analyzing the ingredients...</p>
          </div>
        )}

        <ResultsDisplay data={results} />
      </div>
    </>
  );
}

export default App;
