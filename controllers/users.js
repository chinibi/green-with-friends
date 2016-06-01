var User = require("../models/user");
// var Weekly = require("../models/weekly");

module.exports = {
  create:     create,
  me:         me,
  createFriendRequest: createFriendRequest,
  acceptFriendRequest: acceptFriendRequest
};

function create(req, res, next) {
  if (!req.body.password) {
    return res.status(422).send('Missing required fields');
  }
  User
    .create(req.body)
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully created user.',
        data: {
          username: user.username,
          id:    user._id
        }
      });
    }).catch(function(err) {
      console.log(err)
      if (err.message.match(/E11000/)) {
        err.status = 409;
      } else {
        err.status = 422;
      }
      next(err);
    });
};

function me(req, res, next) {
  User
    .findOne({username: req.decoded.username})
    .populate('friends friendRequests', 'username badges')
    .exec()
    .then(function(user) {
      console.log(user)
      res.json({
        success: true,
        message: 'Successfully retrieved user data.',
        data: user
      });
    })
    .catch(function(err) {
      next(err);
    });
};

function createFriendRequest(req, res, next) {
  User
    .findOne({username: req.body.username}).exec()
    .then(user => {
      if (!req.decoded) {
        next('You must be logged in to do this.')
      }
      user.friendRequests.push({
        username: req.decoded.username,
        id: req.decoded.id
      })
      user.save()
      res.json({
        success: true,
        message: 'Successfully found user.',
        data: user
      })
    })
    .catch(err => next(err))
}

function acceptFriendRequest(req, res, next) {
  console.log(req.body)
  User.findOne({username: req.body.username}).exec()
    .then(requestor => { // add friend to requestor
      var acceptor = {username: req.decoded.username}
      requestor.friends.push(acceptor)
      requestor.save();
      console.log(requestor.friends)
      return User.findOne({username:req.decoded.username}).exec()
    })
    .then(acceptor => { // add friend to acceptor
      acceptor.friends.push(req.body)
      acceptor.friendRequests = acceptor.friendRequests.filter(request => {
        return request.username != req.body.username
      })

      return acceptor.save()
    })
    .then(saved => res.json({
      username: req.body.username
    }))
    .catch(err => {
      console.log(err)
      next(err)
    })
}
