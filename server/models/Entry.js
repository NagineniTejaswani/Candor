import mongoose from 'mongoose';

export const moods = [
  // Positive
  "happy", "joyful", "excited", "calm", "peaceful", "relaxed",
  "content", "confident", "motivated", "hopeful", "grateful",
  "proud", "energetic", "inspired", "focused",
  // Neutral
  "neutral", "curious", "thoughtful", "indifferent", "bored",
  "confused", "tired", "distracted", "awkward", "observant",
  // Negative
  "sad", "angry", "frustrated", "anxious", "stressed",
  "overwhelmed", "lonely", "disappointed", "hurt", "guilty",
  "jealous", "nervous", "restless", "fearful",
  // Complex
  "conflicted", "emotional", "nostalgic", "moody", "uncertain",
  "vulnerable", "hopeful-worried", "calm-sad", "excited-nervous"
];

const entrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: [true, 'Entry text is required'],
    trim: true,
    minlength: [10, 'Text must be at least 10 characters long'],
  },
  mood: {
    type: String,
    enum: moods,
    default: 'neutral',
    trim: true,
  },
  aiSummary: {
    type: String,
    default: '',
  },
  aiMoodScore: {
    type: Number,
    min: 1,
    max: 10,
    default: null,
  },
}, { timestamps: true });

export default mongoose.model('Entry', entrySchema);