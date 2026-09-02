const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: [true, 'Language is required'],
      enum: {
        values: ['java', 'python', 'javascript', 'cpp', 'c'],
        message: '{VALUE} is not a supported programming language',
      },
      lowercase: true,
      trim: true,
      index: true,
    },
    topicId: {
      type: String,
      required: [true, 'Topic ID is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Lesson description is required'],
      trim: true,
    },
    order: {
      type: Number,
      required: [true, 'Lesson order is required'],
      min: 1,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    content: {
      type: String,
      default: '',
    },
    codeExample: {
      type: String,
      required: [true, 'Code example is required'],
    },
    explanation: {
      type: [String],
      required: [true, 'Step-by-step explanation is required'],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length > 0;
        },
        message: 'Explanation must have at least one step',
      },
    },
    realLifeExample: {
      type: String,
      required: [true, 'Real-life example analogy is required'],
      trim: true,
    },
    prerequisites: {
      type: [String],
      default: [],
    },
    estimatedTime: {
      type: String,
      default: '10 mins',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure uniqueness of topic per language
lessonSchema.index({ language: 1, topicId: 1 }, { unique: true });
// Index for ordered syllabus retrieval
lessonSchema.index({ language: 1, order: 1 });

module.exports = mongoose.model('Lesson', lessonSchema);