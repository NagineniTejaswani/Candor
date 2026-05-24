import Groq from 'groq-sdk';
import Entry , { moods }from '../models/Entry.js';

// Lazy init — client created only when needed
// Safe from dotenv load order issues
let groqClient = null;

const getGroqClient = () => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is missing. Check your .env file.');
  }
  if (!groqClient) {
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqClient;
};


export const analyzeEntry = async (req, res) => {
  try {
    const { entryId } = req.body;

    // Find the entry
    const entry = await Entry.findById(entryId);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Check ownership
    if (entry.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Build the prompt
  const prompt = `
You are Candor — a compassionate, emotionally intelligent journal companion.
You are like a wise, warm friend who listens deeply and gently helps people move forward.

A user has written the following journal entry:
"${entry.text}"

Please analyze this entry and respond ONLY with a valid JSON object in this exact format:
{
  "mood": "must be exactly one of: ${moods.join(', ')}",
  "moodScore": a number between 1 and 10 where 1 is very negative and 10 is very positive,
  "summary": "Write 3-4 sentences as one natural flowing response that does three things gently and seamlessly: first make the user feel deeply heard, then offer one honest gentle reframe of their situation, then end with one tiny specific human action they could try today. Use 1-2 emojis naturally wherever they feel most emotionally fitting — beginning, middle, or end. If the tone is very serious or heavy, skip emojis entirely. Never sound like a therapist, a productivity coach, or a robot. Sound like the wisest, warmest friend they have."
}

Return ONLY the JSON. No extra text before or after.
`;

    // Call Groq API
    const client = getGroqClient();

    const response = await client.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    // Extract text response
    const rawText = response.choices[0].message.content.trim();

    // Parse JSON safely
    let aiResult;
    try {
      aiResult = JSON.parse(rawText);
    } catch (parseErr) {
      return res.status(500).json({ 
        message: 'AI returned unexpected format. Try again.',
        raw: rawText,
      });
    }

    // Save AI result to entry
    entry.mood = aiResult.mood;
    entry.aiSummary = aiResult.reflection;
    entry.aiMoodScore = aiResult.moodScore;
    await entry.save();

    // Return updated entry with AI result
    res.json({
      entry,
      ai: aiResult,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};