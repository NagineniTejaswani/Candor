import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';
import MoodBadge from '../components/MoodBadge.jsx';

const EntryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    fetchEntry();
  }, [id]);

  const fetchEntry = async () => {
    try {
      const { data } = await API.get(`/entries/${id}`);
      setEntry(data);
    } catch (err) {
      setError('this entry could not be found');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
  try {
    await API.delete(`/entries/${id}`);
    navigate('/dashboard');
  } catch (err) {
    setError('could not delete this entry');
  }
};

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{background:'var(--bg-primary)',color:'var(--text-primary)'}}>

      {/* Navbar */}
      <Navbar showBack backLabel="back to entries" backPath="/dashboard" />

      <div className="max-w-2xl mx-auto px-8 py-12">

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 bg-[#c9a96e] rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-[#c9a96e] rounded-full animate-pulse delay-75" />
            <div className="w-1 h-1 bg-[#c9a96e] rounded-full animate-pulse delay-150" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20">
            <p
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-3xl font-light theme-text-muted italic mb-4"
            >
              {error}
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs theme-text-muted hover:theme-text-secondary transition-all"
            >
              ← go back
            </button>
          </div>
        )}

        {/* Entry */}
        {!loading && entry && (
          <div>

            {/* Date + mood row */}
            <div className="flex items-center justify-between mb-8">
  <span className="text-xs theme-text-muted">
    {formatDate(entry.createdAt)}
  </span>
  <div className="flex items-center gap-3">
    <MoodBadge mood={entry.mood} />
    {entry.aiMoodScore !== null && (
      <span className="text-[10px] theme-text-muted">
        {entry.aiMoodScore}/10
      </span>
    )}
  </div>
</div>

            {/* Entry text */}
            <div className="mb-8 rounded-2xl px-6 py-5" style={{background:'var(--bg-card)',border:'0.5px solid var(--border)}'}}>
              <p className="text-sm theme-text leading-relaxed">
                {entry.text}
              </p>
            </div> 

            {/* Divider */}
            <div className="h-px bg-[#c9a96e]/10 mb-8" />

            {/* AI reflection */}
            {entry.aiSummary ? (
              <div>
                <p className="text-[9px] tracking-[0.15em] theme-accent/50 uppercase mb-4">
                  candor reflects
                </p>
                <p
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="text-xl font-light theme-text leading-relaxed italic mb-6"
                >
                  {entry.aiSummary}
                </p>
                {entry.aiMoodScore !== null && (
                  <span className="text-[10px] theme-text-muted">
  mood score: {entry.aiMoodScore}/10
</span>
)}
              </div>
            ) : (
              <p className="text-xs theme-text-muted italic">
                not yet reflected upon
              </p>
            )}
          <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
  <button
    onClick={() => navigate('/dashboard')}
    className="text-xs theme-text-muted hover:theme-text-secondary transition-all"
  >
    ← back to entries
  </button>

  {!confirmDelete ? (
    <button
      onClick={() => setConfirmDelete(true)}
      className="text-xs theme-text-muted hover:text-[#E24B4A]/70 transition-all"
    >
      delete entry
    </button>
  ) : (
    <div className="flex items-center gap-4">
      <span className="text-[10px] theme-text-muted">are you sure?</span>
      <button
        onClick={handleDelete}
        className="text-[10px] text-[#E24B4A]/70 hover:text-[#E24B4A] transition-all"
      >
        yes, delete
      </button>
      <button
        onClick={() => setConfirmDelete(false)}
        className="text-[10px] theme-text-muted hover:theme-text-secondary transition-all"
      >
        cancel
      </button>
    </div>
  )}
</div>

          </div>
        )}
      </div>
    </div>
  );
};

export default EntryDetail;