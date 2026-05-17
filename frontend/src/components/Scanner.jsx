import React, { useState, useRef } from 'react';
import { UploadCloud, AlignLeft, Search } from 'lucide-react';

const Scanner = ({ onAnalyze, loading }) => {
  const [mode, setMode] = useState('image'); // 'image' or 'text'
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleAnalyze = () => {
    if (mode === 'image') {
      if (!file) {
        alert('Please select an image first');
        return;
      }
      onAnalyze({ type: 'image', payload: file });
    } else {
      if (!text.trim()) {
        alert('Please enter some text');
        return;
      }
      onAnalyze({ type: 'text', payload: text });
    }
  };

  return (
    <div>
      <div className="tabs">
        <div 
          className={`tab ${mode === 'image' ? 'active' : ''}`}
          onClick={() => setMode('image')}
        >
          <UploadCloud size={20} /> Scan Image
        </div>
        <div 
          className={`tab ${mode === 'text' ? 'active' : ''}`}
          onClick={() => setMode('text')}
        >
          <AlignLeft size={20} /> Enter Text
        </div>
      </div>

      {mode === 'image' ? (
        <div 
          className="upload-area"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input 
            type="file" 
            accept="image/*" 
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          {!preview ? (
            <>
              <UploadCloud size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3>Drag & Drop a food label</h3>
              <p style={{ marginTop: '0.5rem', color: 'var(--text-light)' }}>or click to browse</p>
            </>
          ) : (
            <img src={preview} alt="Preview" className="image-preview" />
          )}
        </div>
      ) : (
        <textarea
          placeholder="Paste ingredients list here... (e.g. Sugar, Cocoa Mass, Milk Fat, Soy Lecithin)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      <button 
        className="btn-primary" 
        style={{ marginTop: '1.5rem', padding: '16px', fontSize: '1.2rem' }}
        onClick={handleAnalyze}
        disabled={loading}
      >
        <Search size={24} /> {loading ? 'Analyzing...' : 'Analyze Ingredients'}
      </button>
    </div>
  );
};

export default Scanner;
