import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';


const WriteEntry = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [entry, setEntry] = useState(null);

  const handleAnalyze = async () => {
    if (text.length < 10) {
      setError('Write at least 10 characters first.');
      return;
    }
    setError('');
    setAnalyzing(true);
    try {
      const { data } = await API.post('/ai/analyze', { text });
      setEntry(data.entry);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setAnalyzing(false);
    }
  };

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return (
    <div className="min-h-screen transition-colors duration-300" style={{background:'var(--bg-primary)',color:'var(--text-primary)'}}>

      {/* Navbar */}
      <Navbar showBack backLabel="back to entries" backPath="/dashboard" />

      <div className="max-w-2xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="mb-8">
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-3xl font-light theme-text mb-2"
          >
            what's on your mind?
          </h2>
          <p className="text-xs theme-text-muted">
            write freely — no one is watching
          </p>
        </div>

        {/* Text area */}
        {!entry && (
          <div className="mb-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Today I felt..."
              rows={10}
              className="w-full rounded-2xl px-6 py-5 text-sm focus:outline-none transition-all resize-none leading-relaxed" style={{background:'var(--bg-card)',border:'0.5px solid var(--border)',color:'var(--text-primary)'}}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] theme-text-muted">
                {wordCount} {wordCount === 1 ? 'word' : 'words'}
              </span>
              <span className="text-[10px] theme-text-muted">
                {text.length} characters
              </span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-[#E24B4A] text-xs py-2 px-3 bg-[#E24B4A]/8 rounded-lg border border-[#E24B4A]/20 mb-4">
            {error}
          </p>
        )}

        {/* Analyze button */}
        {!entry && (
          <button
            onClick={handleAnalyze}
            disabled={analyzing || text.length < 10}
            className="w-full py-3 rounded-xl text-sm border border-[#c9a96e]/40 bg-[#c9a96e]/10 text-[#e8c98a] hover:bg-[#c9a96e]/20 transition-all disabled:opacity-30"
          >
            {analyzing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-1 h-1 bg-[#c9a96e] rounded-full animate-bounce" />
                <span className="w-1 h-1 bg-[#c9a96e] rounded-full animate-bounce delay-75" />
                <span className="w-1 h-1 bg-[#c9a96e] rounded-full animate-bounce delay-150" />
                <span className="ml-2">candor is reading...</span>
              </span>
            ) : (
              '✦ let candor reflect →'
            )}
          </button>
        )}

        {/* AI reflection */}
        {entry && (
          <div>
            <div className="mb-6 bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-5">
              <p className="text-sm theme-text-secondary italic leading-relaxed">
                "{entry.text}"
              </p>
            </div>

            <div className="h-px bg-[#c9a96e]/10 mb-8" />

            <p className="text-[9px] tracking-[0.15em] theme-accent/50 uppercase mb-4">
              candor reflects
            </p>

            <p
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-xl font-light theme-text leading-relaxed mb-6 italic"
            >
              {entry.aiSummary}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] px-3 py-1 rounded-full border border-[#c9a96e]/25 bg-[#c9a96e]/8 theme-accent">
                {entry.mood}
              </span>
              <span className="text-[10px] theme-text-muted">
                mood score: {entry.aiMoodScore}/10
              </span>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 rounded-xl text-sm border border-white/8 theme-text-muted hover:theme-text-secondary transition-all"
            >
              back to entries →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteEntry;