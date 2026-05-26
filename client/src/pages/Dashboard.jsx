import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';
import MoodBadge from '../components/MoodBadge.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredEntryId, setHoveredEntryId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const { data } = await API.get('/entries');
      setEntries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


const handleDeleteConfirm = async () => {
  try {
    await API.delete(`/entries/${deleteTarget}`);
    setEntries((prev) => prev.filter((en) => en._id !== deleteTarget));
  } catch (err) {
    console.error(err);
  } finally {
    setDeleteTarget(null);
  }
};

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen transition-colors duration-300">

      {/* Navbar */}
      <Navbar showNewEntry showLogout />

      <div className="max-w-4xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="mb-10">
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-3xl font-light theme-text mb-2"
          >
            your entries
          </h2>
          <p className="text-xs theme-text-muted">
            {entries.length === 0
              ? 'nothing written yet — your first entry is waiting'
              : `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'} — every one of them matters`}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-3 theme-text-muted text-sm">
            <div className="w-1 h-1 bg-[#c9a96e] rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-[#c9a96e] rounded-full animate-pulse delay-75" />
            <div className="w-1 h-1 bg-[#c9a96e] rounded-full animate-pulse delay-150" />
          </div>
        )}

        {/* Empty state */}
        {!loading && entries.length === 0 && (
          <div className="text-center py-20">
            <p
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-5xl font-light text-[#222] mb-4 italic"
            >
              "The page is waiting."
            </p>
            <p className="text-xs theme-text-muted mb-8">
              write your first entry — candor is listening
            </p>
            <button
              onClick={() => navigate('/write')}
              className="px-7 py-2.5 rounded-full text-sm border border-[#c9a96e]/40 bg-[#c9a96e]/10 text-[#e8c98a] hover:bg-[#c9a96e]/20 transition-all"
            >
              begin writing →
            </button>
          </div>
        )}

        {/* Entries list */}
        {!loading && entries.length > 0 && (
          <div className="flex flex-col gap-4">
            {entries.map((entry) => (
              <div
                key={entry._id}
                onClick={() => navigate(`/entry/${entry._id}`)}
                onMouseEnter={() => setHoveredEntryId(entry._id)}
                onMouseLeave={() => setHoveredEntryId(null)}
                className="rounded-2xl p-6 transition-all group cursor-pointer"
                style={{
                  background: hoveredEntryId === entry._id ? 'rgba(201, 169, 110, 0.08)' : 'rgba(255,255,255,0.02)',
                  border: hoveredEntryId === entry._id ? '0.9px solid #c9a96e' : '0.9px solid rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p 
                    className="text-sm theme-text-secondary italic leading-relaxed line-clamp-2 flex-1"
                  >
                    {entry.text}
                  </p>
                  <span className="text-[10px] theme-text-muted whitespace-nowrap mt-1">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Mood badge */}
                    <MoodBadge mood={entry.mood} />

                    {/* Score */}
                    {entry.aiMoodScore && (
                      <span className="text-[10px] theme-text-muted">
                        {entry.aiMoodScore}/10
                      </span>
                    )}

                    {/* AI analyzed badge */}
                    {entry.aiSummary ? (
                      <span className="text-[10px] theme-accent/50">
                        ✦ reflected
                      </span>
                    ) : (
                      <span className="text-[10px] theme-text-muted">
                        not yet analyzed
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <button 
                      className="text-[10px] theme-text-muted transition-all"
                      style={{color: hoveredEntryId === entry._id ? '#E24B4A' : '#444',
                        transition: 'all 0.3s ease'}}
                      onClick={(e) => { e.stopPropagation(); setDeleteTarget(entry._id); }}
                    >
                      delete
                    </button>
                    <span 
                      className="text-[10px] theme-text-muted transition-all" style={{color: hoveredEntryId === entry._id ? '#c9a96e' : '#444',
                  transition: 'all 0.3s ease'}}
                    >
                      read →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
{deleteTarget && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="rounded-2xl p-8 max-w-sm w-full mx-4 text-center" style={{background:'var(--bg-secondary)',border:'0.5px solid var(--border)'}}>
      <p
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        className="text-xl theme-text font-light mb-2"
      >
        delete this entry?
      </p>
      <p className="text-xs theme-text-muted mb-8">
        this cannot be undone — the words will be gone
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setDeleteTarget(null)}
          className="px-6 py-2 rounded-full text-xs border border-white/10 theme-text-muted hover:theme-text-secondary transition-all"
        >
          keep it
        </button>
        <button
          onClick={handleDeleteConfirm}
          className="px-6 py-2 rounded-full text-xs border border-red-400/30 bg-red-400/10 text-red-400/70 hover:bg-red-400/20 transition-all"
        >
          yes, delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Dashboard;