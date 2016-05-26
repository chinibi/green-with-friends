var mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({
  description: {type: String, required: true},
  completed: {type: Boolean, default: false}
});

var weeklySchema = new mongoose.Schema({
  description: String,
  badge: {type: String, required: true},
  imgURL: String,
  challenges: [challengeSchema]
});

var Weekly = mongoose.model('Weekly', weeklySchema);

module.exports = Weekly;
