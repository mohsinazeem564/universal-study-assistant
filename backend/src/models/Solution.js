const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true,
    index: true
  },
  solution: {
    type: String,
    required: true
  },
  explanation: String,
  steps: [String],
  diagram: {
    url: String,
    type: String,
    code: String
  },
  keywords: [String],
  userId: String,
  language: {
    type: String,
    default: 'en'
  },
  aiModel: {
    type: String,
    default: 'gpt-4'
  },
  processingTime: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Solution', solutionSchema);
