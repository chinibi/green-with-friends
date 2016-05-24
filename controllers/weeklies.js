var Weekly = require('../models/weekly');

function show(req, res, next) {
  Weekly.findOne({}).exec()
    .then(weekly => {
      res.json(weekly);
    }).catch(err => {
      next(err);
    })
}

function update(req, res, next) {
  Weekly.findOne({_id: "574381becd7bc0b87359dfd4"}).exec()
    .then(weekly => {
      weekly.challenges = req.body.challenges;
      weekly.save((err, saved) => {
        if (err) next(err)
        else res.json(saved)
      })
    }).catch(err => console.log(err))
}

module.exports = {
  show: show,
  update: update
}
