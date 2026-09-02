const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');
const { protect } = require('../middleware/authMiddleware');

const SUPPORTED_LANGUAGES = ['java', 'python', 'javascript', 'cpp', 'c'];

// GET /api/progress/:language — Get user's progress for a specific language
router.get('/:language', protect, async (req, res) => {
  try {
    const language = req.params.language.toLowerCase().trim();

    if (!SUPPORTED_LANGUAGES.includes(language)) {
      return res.status(400).json({
        message: `Unsupported language '${req.params.language}'. Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`,
      });
    }

    let progress = await Progress.findOne({
      userId: req.user._id,
      language,
    });

    if (!progress) {
      // Find first lesson for the default starting point
      const firstLesson = await Lesson.findOne({ language }).sort({ order: 1 });
      return res.json({
        language,
        completedLessons: [],
        completedTopics: [],
        currentLesson: firstLesson ? firstLesson.topicId : null,
        lastAccessedLesson: null,
        progressPercentage: 0,
        progressPercent: 0,
      });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving progress' });
  }
});

// GET /api/progress — Fallback for current user's selected language
router.get('/', protect, async (req, res) => {
  try {
    const language = (req.user.selectedLanguage || 'java').toLowerCase();
    const progress = await Progress.findOne({
      userId: req.user._id,
      language,
    });

    if (!progress) {
      const firstLesson = await Lesson.findOne({ language }).sort({ order: 1 });
      return res.json({
        language,
        completedLessons: [],
        completedTopics: [],
        currentLesson: firstLesson ? firstLesson.topicId : null,
        lastAccessedLesson: null,
        progressPercentage: 0,
        progressPercent: 0,
      });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving progress' });
  }
});

// POST /api/progress/:language/complete — Mark a lesson as complete & calculate progress on backend
router.post('/:language/complete', protect, async (req, res) => {
  try {
    const language = req.params.language.toLowerCase().trim();
    const { topicId } = req.body;

    if (!SUPPORTED_LANGUAGES.includes(language)) {
      return res.status(400).json({
        message: `Unsupported language '${req.params.language}'. Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`,
      });
    }

    if (!topicId || typeof topicId !== 'string' || !topicId.trim()) {
      return res.status(400).json({ message: 'Topic ID is required' });
    }

    const normalizedTopicId = topicId.toLowerCase().trim();

    // 1. Verify that the lesson actually exists in MongoDB
    const lesson = await Lesson.findOne({
      language,
      topicId: normalizedTopicId,
    });

    if (!lesson) {
      return res.status(404).json({
        message: `Lesson '${topicId}' not found for language '${language}'`,
      });
    }

    // 2. Find or create user progress document for this language
    let progress = await Progress.findOne({
      userId: req.user._id,
      language,
    });

    if (!progress) {
      progress = new Progress({
        userId: req.user._id,
        language,
        completedLessons: [],
        completedTopics: [],
      });
    }

    // Ensure array synchronization between completedLessons and completedTopics
    const currentCompleted = new Set([
      ...(progress.completedLessons || []),
      ...(progress.completedTopics || []),
    ]);

    // 3. Add topicId idempotently
    currentCompleted.add(normalizedTopicId);
    const updatedCompletedArray = Array.from(currentCompleted);

    // 4. Calculate progress percentage using total lesson count from MongoDB
    const totalLessons = await Lesson.countDocuments({ language });
    const progressPercentage =
      totalLessons > 0
        ? Number(((updatedCompletedArray.length / totalLessons) * 100).toFixed(2))
        : 0;

    // 5. Determine next lesson for currentLesson pointer
    const nextLesson = await Lesson.findOne({
      language,
      order: lesson.order + 1,
    });

    progress.completedLessons = updatedCompletedArray;
    progress.completedTopics = updatedCompletedArray;
    progress.progressPercentage = progressPercentage;
    progress.progressPercent = progressPercentage;
    progress.lastAccessedLesson = normalizedTopicId;
    if (nextLesson) {
      progress.currentLesson = nextLesson.topicId;
    } else {
      progress.currentLesson = normalizedTopicId;
    }
    progress.lastUpdated = Date.now();

    await progress.save();

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating lesson completion progress' });
  }
});

// Legacy POST /api/progress — Support backwards compatibility if needed
router.post('/', protect, async (req, res) => {
  const { language, topicId } = req.body;
  if (language && topicId) {
    req.params.language = language;
    return router.handle(req, res);
  }
  res.status(400).json({ message: 'Please use POST /api/progress/:language/complete' });
});

module.exports = router;