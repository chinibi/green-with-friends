var Weekly = require('../models/weekly');
var User = require('../models/user');

module.exports = {
  show:       show,
  update:     update,
  create:     create,
  awardBadge: awardBadge
}

function show(req, res, next) {
  // rotate weekly after some time
  // will be two minutes per rotation for
  // demo purposes
  var today = Math.floor(Date.now()/60000); // this is actually Date.now() in minutes
  var p = 2 // minutes between each rotation

  var weekId;
  var thisWeekly;

  Weekly.count().exec()
    .then(n => {
      var week = Math.floor( (today % (p*n)) / p)
      return Weekly.find().skip(week).limit(1).exec()
    })
    .then(weekly => {
      thisBadge = weekly[0].badge;
      thisWeekly = weekly[0];
      console.log(weekly)
      return User.findOne({username: req.decoded.username}).exec()
    })
    .then(user => {
      if (typeof user.weekly[0] === 'undefined') {
        console.log('no badge found')
        user.weekly = thisWeekly;
        user.save()
        res.json(user.weekly[0])
      }
      else if (user.weekly[0].badge !== thisBadge) {
        user.weekly = thisWeekly;
        user.save()
        res.json(user.weekly[0])
      }
      else res.json(user.weekly[0])
    })
    .catch(err => {
      console.log(err)
      next(err);
    })
}

function create(req, res, next) {
  var newWeekly = new Weekly(req.body);

  newWeekly.save()
    .then(saved => res.json(saved))
    .catch(err => {
      console.log(err);
      next(err);
    })
}

function update(req, res, next) {
  User.findOne({username: req.decoded.username}).exec()
    .then(user => {
      user.weekly[0].challenges = req.body.challenges
      return user.save()
    })
    .then(saved => res.json(saved))
    .catch(err => next(err))
}

function awardBadge(req, res, next) {
  User.findOne({username: req.decoded.username}).exec()
    .then(user => {
      // push badge into user.badges
        var newBadge = {
          name: req.body.badge,
          imgURL: req.body.imgURL
        }

        function duplicateBadge(badge) {
          return badge.name == newBadge.name
        }

        if (!user.badges.find(duplicateBadge)) {
          user.badges.push(newBadge)
        }
        return user.save()
    })
    .then(saved => {
      res.json(saved)
    })
}
