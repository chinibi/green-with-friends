var Weekly = require('../models/weekly');
var User = require('../models/user');

function show(req, res, next) {
  var weekId;
  var thisWeekly;
  Weekly.findOne({}).exec()
    .then(weekly => {
      weekId = weekly.week;
      console.log(weekly)
      console.log(req.decoded.username)
      thisWeekly = weekly.toObject();
      User.findOne({username: req.decoded.username}).exec()
    })
    .then(user => {
      if (user.weekly.week !== thisWeek) {
        user.weekly = thisWeekly;
        user.save()
      }
      else return user
    })
    .then(saved => {
      res.json(saved.weekly)
    })
    .catch(err => {
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
      user.weekly.challenges = req.body.challenges;
      user.save()
    })
    .then(saved => res.json(saved))
    .catch(err => console.log(err))
}

module.exports = {
  show: show,
  update: update
}
