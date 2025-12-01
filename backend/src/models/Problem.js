const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    index: 'text'
  },
  subject: {
    type: String,
    required: true,
    index: true
  },
  topic: {
    type: String,
    index: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  userId: {
    type: String,
    index: true
  },
  imageUrl: String,
  tags: [String],
  views: {
    type: Number,
    default: 0
  },
  helpful: {
    type: Number,
    default: 0
  },
  notHelpful: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

problemSchema.index({ text: 'text', subject: 1, topic: 1 });

module.exports = mongoose.model('Problem', problemSchema);
