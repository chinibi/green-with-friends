var Weekly = require('../models/weekly');
var User = require('../models/user');

module.exports = {
  show:       show,
  update:     update,
  awardBadge: awardBadge
}

function show(req, res, next) {
  // rotate weekly after some time
  // will be two minutes per rotation for
  // demo purposes
  var today = new Date();
  var week = Math.floor(((today.getMinutes() % 8) / 2) + 1 );

  var weekId;
  var thisWeekly;
  Weekly.findOne({week: week}).exec()
    .then(weekly => {
      weekId = weekly.week;
      thisWeekly = weekly.toObject();
      return User.findOne({username: req.decoded.username}).exec()
    })
    .then(user => {
      if (typeof user.weekly[0] === 'undefined') {
        user.weekly = thisWeekly;
        user.save()
        res.json(user.weekly[0])
      }
      else if (user.weekly[0].week !== weekId) {
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

function update(req, res, next) {
  console.log('update function called')
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
        user.badges.push({
          name: req.body.badge,
          imgURL: req.body.imgURL
        })
        console.log(user.badges)
        return user.save()
    })
    .then(saved => {
      res.json(saved)
    })
}
