import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios.js';

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
    <div className="min-h-screen bg-[#0d0d0f] text-[#e8e4de]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <h1
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-[#c9a96e] text-2xl font-light tracking-widest italic cursor-pointer"
          onClick={() => navigate('/')}
        >
          Candor
        </h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-xs text-[#444] hover:text-[#666] transition-all"
        >
          ← back to entries
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="mb-8">
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-3xl font-light text-[#e8e4de] mb-2"
          >
            what's on your mind?
          </h2>
          <p className="text-xs text-[#444]">
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
              className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-5 text-sm text-[#c8c4be] placeholder-[#333] focus:outline-none focus:border-[#c9a96e]/25 transition-all resize-none leading-relaxed"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-[#333]">
                {wordCount} {wordCount === 1 ? 'word' : 'words'}
              </span>
              <span className="text-[10px] text-[#333]">
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
              <p className="text-sm text-[#777] italic leading-relaxed">
                "{entry.text}"
              </p>
            </div>

            <div className="h-px bg-[#c9a96e]/10 mb-8" />

            <p className="text-[9px] tracking-[0.15em] text-[#c9a96e]/50 uppercase mb-4">
              candor reflects
            </p>

            <p
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-xl font-light text-[#c8c4be] leading-relaxed mb-6 italic"
            >
              {entry.aiSummary}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] px-3 py-1 rounded-full border border-[#c9a96e]/25 bg-[#c9a96e]/8 text-[#c9a96e]">
                {entry.mood}
              </span>
              <span className="text-[10px] text-[#444]">
                mood score: {entry.aiMoodScore}/10
              </span>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 rounded-xl text-sm border border-white/8 text-[#555] hover:text-[#777] transition-all"
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