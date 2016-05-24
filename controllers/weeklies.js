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
  console.log('update function called')
  User.findOne({username: req.decoded.username}).exec()
    .then(user => {
      console.log('-----USER.CHALLENGES-----')
      console.log(user.weekly[0].challenges)
      console.log('-----REQ.BODY-----')
      console.log(req.body.challenges)
      user.weekly[0].challenges = req.body.challenges
      console.log('BEFORE SAVE\n' + user.weekly[0].challenges)
      user.save((err, saved) => {
        if (err) console.log(`ERROR: ${err}`);
        else {
          console.log(`SAVED: ${saved.weekly[0].challenges}`);
          res.json(saved);
        }
      })
    })
}

module.exports = {
  show: show,
  update: update
}
