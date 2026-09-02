const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const SUPPORTED_LANGUAGES = ['java', 'python', 'javascript', 'cpp', 'c'];

// GET /api/users/profile — Get current user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving profile' });
  }
});

// PUT /api/users/language — Save selected language
router.put('/language', protect, async (req, res) => {
  const { language } = req.body;

  if (!language || typeof language !== 'string' || !SUPPORTED_LANGUAGES.includes(language.toLowerCase().trim())) {
    return res.status(400).json({
      message: `Invalid language '${language}'. Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`,
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { selectedLanguage: language.toLowerCase().trim() },
      { returnDocument: 'after' }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating user language' });
  }
});

module.exports = router;