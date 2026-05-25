export const moodColors = {
  happy: '#f59e0b', joyful: '#f59e0b', excited: '#f59e0b',
  calm: '#6ee7b7', peaceful: '#6ee7b7', relaxed: '#6ee7b7',
  content: '#6ee7b7', grateful: '#6ee7b7', hopeful: '#6ee7b7',
  sad: '#93c5fd', lonely: '#93c5fd', disappointed: '#93c5fd',
  hurt: '#93c5fd', nostalgic: '#93c5fd',
  anxious: '#fca5a5', stressed: '#fca5a5', overwhelmed: '#fca5a5',
  angry: '#fca5a5', frustrated: '#fca5a5', fearful: '#fca5a5',
  neutral: '#9ca3af', confused: '#9ca3af', tired: '#9ca3af',
  bored: '#9ca3af', indifferent: '#9ca3af',
};

export const getMoodColor = (mood) => moodColors[mood] || '#9ca3af';