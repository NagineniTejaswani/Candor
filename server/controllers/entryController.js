import Entry from '../models/Entry.js';

// @route POST /api/entries
// @desc Create a new journal entry
export const createEntry = async (req, res) => {
  try {
    const { text, mood } = req.body;

    // Validate
    if (!text || text.length < 10) {
      return res.status(400).json({ 
        message: 'Entry must be at least 10 characters' 
      });
    }

    const entry = await Entry.create({
      userId: req.user._id,
      text,
      mood: mood || 'neutral',
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/entries
// @desc Get all entries for logged in user
export const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/entries/:id
// @desc Get single entry by id
export const getEntryById = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Make sure entry belongs to logged in user
    if (entry.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route PUT /api/entries/:id
// @desc Update an entry
export const updateEntry = async (req, res) => {
  try {
    const { text, mood } = req.body;

    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Make sure entry belongs to logged in user
    if (entry.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    entry.text = text || entry.text;
    entry.mood = mood || entry.mood;
    await entry.save();

    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route DELETE /api/entries/:id
// @desc Delete an entry
export const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Make sure entry belongs to logged in user
    if (entry.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await entry.deleteOne();

    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};