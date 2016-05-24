var mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({
  description: String,
  completed: {type: Boolean, default: false}
});

var weeklySchema = new mongoose.Schema({
  description: String,
  badge: String,
  date: String,
  week: Number,
  challenges: [challengeSchema]
});

var Weekly = mongoose.model('Weekly', weeklySchema);

module.exports = Weekly;
