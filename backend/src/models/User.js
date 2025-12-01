const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  preferences: {
    defaultDifficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    favoriteSubjects: [String],
    language: {
      type: String,
      default: 'en',
    },
    notifications: {
      type: Boolean,
      default: true,
    },
  },
  subscription: {
    type: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free',
    },
    expiresAt: Date,
  },
  stats: {
    problemsSolved: {
      type: Number,
      default: 0,
    },
    streak: {
      type: Number,
      default: 0,
    },
    lastActiveDate: Date,
  },
  lastLogin: Date,
}, {
  timestamps: true,
});

// Update stats on problem solve
userSchema.methods.incrementProblemsSolved = async function() {
  this.stats.problemsSolved += 1;
  
  // Update streak
  const today = new Date().setHours(0, 0, 0, 0);
  const lastActive = this.stats.lastActiveDate 
    ? new Date(this.stats.lastActiveDate).setHours(0, 0, 0, 0)
    : null;
  
  if (!lastActive || today - lastActive > 86400000) {
    // More than 1 day gap
    if (today - lastActive === 86400000) {
      // Exactly 1 day - continue streak
      this.stats.streak += 1;
    } else {
      // Reset streak
      this.stats.streak = 1;
    }
  }
  
  this.stats.lastActiveDate = new Date();
  await this.save();
};

module.exports = mongoose.model('User', userSchema);
