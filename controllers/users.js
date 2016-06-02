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
    .findById(req.decoded.id)
    .populate('friends friendRequests', 'username badges')
    .exec()
    .then(user => {
      res.json({
        success: true,
        message: 'Successfully retrieved user data.',
        data: user
      });
    })
    .catch(err => next(err));
};

function createFriendRequest(req, res, next) {
  User
    .findOne({username: req.body.username}).exec()
    .then(user => {
      if (!req.decoded) {
        next('You must be logged in to do this.')
      }
      user.friendRequests.push(req.decoded.id)
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
  User.findById(req.body._id).exec()
    .then(requestor => { // add friend to requestor
      var acceptor = req.decoded.id;
      requestor.friends.push(acceptor);
      requestor.save();

      return User.findById(req.decoded.id).exec()
    })
    .then(acceptor => { // add friend to acceptor
      var requestor = req.body._id;
      acceptor.friends.push(requestor);
      acceptor.friendRequests.splice(acceptor.friendRequests.indexOf(requestor), 1);
      return acceptor.save()
    })
    .then(saved => res.json(req.body))
    .catch(err => {
      console.log(err);
      next(err);
    })
}
