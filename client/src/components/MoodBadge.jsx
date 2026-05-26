import { moodColors } from '../utils/moodColors.js';

const getMoodColor = (mood) => moodColors[mood] || '#9ca3af';

const MoodBadge = ({ mood }) => {
  const color = getMoodColor(mood);
  return (
    <span
      className="text-[10px] px-3 py-1 rounded-full border"
      style={{
        color,
        borderColor: color + '40',
        background: color + '12',
      }}
    >
      {mood}
    </span>
  );
};

export default MoodBadge;