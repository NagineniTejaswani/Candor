import { useNavigate } from 'react-router-dom';
import MoodBadge from './MoodBadge.jsx';

const EntryCard = ({ entry, onDelete }) => {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-[#c9a96e]/20 hover:bg-white/[0.03] transition-all group">
      
      {/* Entry preview + date */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <p
          onClick={() => navigate(`/entry/${entry._id}`)}
          className="text-sm text-[#777] italic leading-relaxed cursor-pointer hover:text-[#999] transition-all flex-1"
        >
          "{entry.text.slice(0, 80)}{entry.text.length > 80 ? '...' : ''}"
        </p>
        <span className="text-[10px] text-[#333] whitespace-nowrap mt-1">
          {formatDate(entry.createdAt)}
        </span>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MoodBadge mood={entry.mood} />
          {entry.aiMoodScore !== null && (
            <span className="text-[10px] text-[#444]">
              {entry.aiMoodScore}/10
            </span>
          )}
          {entry.aiSummary ? (
            <span className="text-[10px] text-[#c9a96e]/50">✦ reflected</span>
          ) : (
            <span className="text-[10px] text-[#333]">not yet reflected</span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span
            onClick={() => navigate(`/entry/${entry._id}`)}
            className="text-[10px] text-[#333] group-hover:text-[#c9a96e]/50 transition-all cursor-pointer"
          >
            read →
          </span>
          <span
            onClick={() => onDelete(entry._id)}
            className="text-[10px] text-[#333] hover:text-[#E24B4A]/70 transition-all cursor-pointer"
          >
            delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;