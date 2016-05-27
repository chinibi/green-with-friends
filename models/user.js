var mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({
  description: String,
  completed: {type: Boolean, default: false}
});

var personalWeeklySchema = new mongoose.Schema({
  description: String,
  badge: String,
  imgURL: String,
  challenges: [challengeSchema]
});

var badgeSchema = new mongoose.Schema({
  name: String,
  imgURL: String
})

var friendSchema = new mongoose.Schema({
  username: String,
  id: String
})

var friendRequestSchema = new mongoose.Schema({
  username: String,
  id: String
})

var userSchema = mongoose.Schema({
  username: {type: String, unique: true, required: true},
  badges: [badgeSchema],
  weekly: [personalWeeklySchema],
  friends: [friendSchema],
  friendRequests: [friendRequestSchema]
});

// add bcrypt hashing to model (works on a password field)!
userSchema.plugin(require('mongoose-bcrypt'));

// Add a "transformation" to the model's toJson function that
// stops the password field (even in digest format) from being
// returned in any response.
userSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password;
    return returnedObject;
  }
};

var User = mongoose.model('User', userSchema);

module.exports = User;
