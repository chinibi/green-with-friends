var Weekly = require('../models/weekly');
var User = require('../models/user');

function show(req, res, next) {
  var weekId;
  var thisWeekly;
  Weekly.findOne({}).exec()
    .then(weekly => {
      weekId = weekly.week;
      // console.log(weekly)
      // console.log(req.headers)
      thisWeekly = weekly.toObject();
      console.log('username: ' + req.decoded.username)
      return User.findOne({username: req.decoded.username}).exec()
    })
    .then(user => {
      console.log(user)
      if (user.weekly.week !== weekId) {
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

// function update(req, res, next) {
//   Weekly.findOne({_id: "574381becd7bc0b87359dfd4"}).exec()
//     .then(weekly => {
//       weekly.challenges = req.body.challenges;
//       weekly.save((err, saved) => {
//         if (err) next(err)
//         else res.json(saved)
//       })
//     }).catch(err => console.log(err))
// }

function update(req, res, next) {
  User.findOne({username: req.decoded.username}).exec()
    .then(user => {
      console.log(user)
      user.weekly.challenges = req.body.challenges;
      user.save()
    }, err => console.log(err))
    .then(saved => res.json(saved))
    .catch(err => console.log(err))
}

module.exports = {
  show: show,
  update: update
}
