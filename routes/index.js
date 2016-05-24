var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersCtrl = require('../controllers/users');
var weeklyCtrl = require('../controllers/weeklies');

// Require token authentication.
var token = require('../config/token_auth');

// users resource paths:
router.post('/api/users',    usersCtrl.create);
router.get( '/api/users/me', token.authenticate, usersCtrl.me);
// router.get('/api/users/me/weekly')

router.post('/api/token',    token.create);

// get the challenges for this week
router.get('/api/weekly', token.authenticate, weeklyCtrl.show);
router.put('/api/weekly', weeklyCtrl.update);

module.exports = router;
