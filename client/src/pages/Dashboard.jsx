import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';
import MoodBadge from '../components/MoodBadge.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
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
    <div className="min-h-screen bg-[#0d0d0f] text-[#e8e4de]">

      {/* Navbar */}
      <Navbar showNewEntry showLogout />

      <div className="max-w-4xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="mb-10">
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-3xl font-light text-[#e8e4de] mb-2"
          >
            your entries
          </h2>
          <p className="text-xs text-[#444]">
            {entries.length === 0
              ? 'nothing written yet — your first entry is waiting'
              : `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'} — every one of them matters`}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-3 text-[#444] text-sm">
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
            <p className="text-xs text-[#444] mb-8">
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
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 cursor-pointer hover:border-[#c9a96e]/20 hover:bg-white/[0.03] transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="text-sm text-[#777] italic leading-relaxed line-clamp-2 flex-1">
                    {entry.text}
                  </p>
                  <span className="text-[10px] text-[#333] whitespace-nowrap mt-1">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Mood badge */}
                    <MoodBadge mood={entry.mood} />

                    {/* Score */}
                    {entry.aiMoodScore && (
                      <span className="text-[10px] text-[#444]">
                        {entry.aiMoodScore}/10
                      </span>
                    )}

                    {/* AI analyzed badge */}
                    {entry.aiSummary ? (
                      <span className="text-[10px] text-[#c9a96e]/50">
                        ✦ reflected
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#333]">
                        not yet analyzed
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
<button className="text-[10px] text-[#333] hover:text-[#FF6A74]/50 transition-all" onClick={(e) => { e.stopPropagation(); setDeleteTarget(entry._id); }}>
  delete
</button>
  <span className="text-[10px] text-[#333] group-hover:text-[#c9a96e]/50 transition-all">
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
    <div className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
      <p
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        className="text-xl text-[#e8e4de] font-light mb-2"
      >
        delete this entry?
      </p>
      <p className="text-xs text-[#555] mb-8">
        this cannot be undone — the words will be gone
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setDeleteTarget(null)}
          className="px-6 py-2 rounded-full text-xs border border-white/10 text-[#555] hover:text-[#888] transition-all"
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