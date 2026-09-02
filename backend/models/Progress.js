const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    language: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      enum: ['java', 'python', 'javascript', 'cpp', 'c'],
    },
    completedLessons: {
      type: [String],
      default: [],
    },
    completedTopics: {
      type: [String],
      default: [],
    },
    currentLesson: {
      type: String,
      default: null,
    },
    lastAccessedLesson: {
      type: String,
      default: null,
    },
    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    progressPercent: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index to guarantee one progress record per user per language
progressSchema.index({ userId: 1, language: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);