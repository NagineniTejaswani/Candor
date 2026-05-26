import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MoodBadge from './MoodBadge.jsx';

const EntryCard = ({ entry, onDelete }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  return (
    <div
      className="entry-card rounded-2xl p-6 transition-all group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: isHovered ? '0.5px solid #c9a96e' : '0.5px solid rgba(255,255,255,0.05)',
        background: isHovered ? 'rgba(201, 169, 110, 0.2)' : 'rgba(255,255,255,0.02)',
        boxShadow: isHovered ? '0 0 12px rgba(201, 169, 110, 0.2)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      
      {/* Entry preview + date */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <p
          onClick={() => navigate(`/entry/${entry._id}`)}
          className="text-sm italic leading-relaxed cursor-pointer transition-all flex-1 entry-text"
          style={{
            color: isHovered ? '#c9a96e' : '#888',
            transition: 'color 0.3s ease',
          }}
        >
          "{entry.text.slice(0, 80)}{entry.text.length > 80 ? '...' : ''}"
        </p>
        <span className="text-[10px] theme-text-muted whitespace-nowrap mt-1">
          {formatDate(entry.createdAt)}
        </span>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MoodBadge mood={entry.mood} />
          {entry.aiMoodScore !== null && (
            <span className="text-[10px] theme-text-muted">
              {entry.aiMoodScore}/10
            </span>
          )}
          {entry.aiSummary ? (
            <span className="text-[10px] theme-accent/50">✦ reflected</span>
          ) : (
            <span className="text-[10px] theme-text-muted">not yet reflected</span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span
            onClick={() => navigate(`/entry/${entry._id}`)}
            className="read-arrow text-[10px] transition-all cursor-pointer"
            style={{
              color: isHovered ? '#c9a96e' : '#444',
              transition: 'color 0.3s ease',
            }}
          >
            read →
          </span>
          <span
            onClick={() => onDelete(entry._id)}
            className="delete-btn text-[10px] transition-all cursor-pointer"
            style={{
              color: isHovered ? '#E24B4A' : '#444',
              transition: 'color 0.3s ease',
            }}
          >
            delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;