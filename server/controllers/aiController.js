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


export const analyzeAndSave = async (req, res) => {
  try {
    const { text } = req.body;

    // Validate
    if (!text || text.length < 10) {
      return res.status(400).json({
        message: 'Entry must be at least 10 characters'
      });
    }

    // Build prompt
const prompt = `
You are Candor — a warm, emotionally intelligent journal companion who feels like a wise best friend.
You listen deeply, reflect honestly, and never sound like a therapist or productivity coach.

A user has written this journal entry:
"${text}"

Respond ONLY with a valid JSON object in this exact format:
{
  "mood": "exactly one word from this list: ${moods.join(', ')}",
  "moodScore": a number from 1 to 10 where 1 is very negative and 10 is very positive,
  ""summary": "3-5 sentences as one natural flowing response. First make them feel truly heard, then gently reflect their situation back honestly, then end with one specific caring suggestion directly about what they wrote. Sound like the wisest warmest friend they have — never a therapist, never a coach, never generic."
}

Rules:
- mood must be a single word only, exactly from the list provided
- Use emojis naturally and generously throughout — hearts ❤️, hugs 🫂, sparkles ✨, and whatever fits the emotional tone of the entry. If they're happy, celebrate with them 🎉. If they're sad, be gentle 🤍. If they're anxious, be grounding 🌿. If the entry is very dark or heavy, use emojis sparingly or skip. Let the emojis feel like a warm friend texting, not a reaction button.
- Return ONLY the JSON, no extra text before or after
`;

    // Call Groq
    const client = getGroqClient();
    const response = await client.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

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

    // NOW save — only if AI succeeded
    const entry = await Entry.create({
      userId: req.user._id,
      text,
      mood: aiResult.mood,
      aiSummary: aiResult.summary,
      aiMoodScore: aiResult.moodScore,
    });

    res.status(201).json({
      entry,
      ai: aiResult,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};