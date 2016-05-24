require('dotenv').load();
var mongoose = require('./database');

var User = require('../models/user');
var Weekly = require('../models/weekly');

var users = [
  { username: 'admin',
    displayname: 'admin',
    password: process.env.ADMIN_PASSWORD,
    badges: ['Energy Saver', 'Water Conservation', 'Tree Hugger', 'Trekker']
  }
];

var weeklies = [
  { description: 'If you use a low-flow showerhead, you can save 15 gallons of water during a 10 minute shower.',
    badge: 'Water Conservation',
    date: 'May 16 – May 23',
    week: 1,
    challenges: [
      {description: 'Take 3 two-minute showers'},
      {description: 'Use a tub to wash dishes'},
      {description: 'Make a solar still'},
      {description: 'Go vegetarian'},
      {description: 'Hand wash laundry'}
    ]
  },
  { description: 'A single tree can absorb one ton of carbon dioxide over its lifetime.',
    badge: 'Tree Hugger',
    date: 'May 23 – May 30',
    week: 2,
    challenges: [
      {description: 'Plant a tree'},
      {description: 'Hug a tree'},
      {description: 'Recycle everything tree-based, like paper'},
      {description: 'Take a walk around your local park.'},
      {description: "Warm day? Rest in a tree's shade"}
    ]
  }
];

User
  .remove({})
  .then(function() {
    User.create(users, (err, users) => {
      if (err) console.log(err);
      else {
        console.log(`Database seeded with ${users.length} users.`)
      }
    })
  })


Weekly
  .remove({})
  .then(function() {
    Weekly.create(weeklies, (err, weeklies) => {
      if (err) console.log(err);
      else {
        console.log(`Database seeded with ${weeklies.length} weeklies.`)

        mongoose.connection.close();
      }
      process.exit(0);
    })
  })
