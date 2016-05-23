var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {type: String, unique: true, required: true},
  displayname: {type: String, required: true},
})

var User = mongoose.model('User', userSchema);

module.exports = User;
