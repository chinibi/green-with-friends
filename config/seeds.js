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
    imgURL: 'images/Water.png',
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
    imgURL: 'images/Leaf.png',
    week: 2,
    challenges: [
      {description: 'Plant a tree'},
      {description: 'Hug a tree'},
      {description: ''},
      {description: 'Take a walk around your local park.'},
      {description: "Warm day? Rest in a tree's shade"}
    ]
  },
  { description: 'The Earth receives one kilowatt per square meter of sunlight on a clear day.',
    badge: 'Energy Saver',
    imgURL: 'images/Energy.png',
    week: 3,
    challenges: [
      {description: "Walk, ride a bike, a bus, or carpool on a daily commute."},
      {description: "Hot day? Cold day? Survive one day without the heater or air conditioner"},
      {description: "Do your laundry and the dishes with cold water."},
      {description: "Hang your laundry to air dry."}
    ]
  },
  { description: 'Recyclables include metals, paper, cardboard, glass, plastic, batteries, light bults, and electronics.',
    badge: 'Recycling and Waste',
    imgURL: 'images/Grey1.png',
    week: 4,
    challenges: [
      {description: 'Gather your bottles and cans and take them to your local facility for some cash.'},
      {description: 'Have a day where no more than one pound of garbage is produced.'},
      {description: "Get some electronics you don't use anymore and take them to an electronics recycler."},
      {description: 'Get a reusable bag for your groceries.'},
      {description: 'Compost food scraps and yard waste.'}
    ]
  }
];

User
  .remove({})
  .then(() => {
    User.create(users, (err, users) => {
      if (err) console.log(err);
      else {
        console.log(`Database seeded with ${users.length} users.`)
      }
    })
  })


Weekly
  .remove({})
  .then(() => {
    Weekly.create(weeklies, (err, weeklies) => {
      if (err) console.log(err);
      else {
        console.log(`Database seeded with ${weeklies.length} weeklies.`)

        mongoose.connection.close();
      }
      process.exit(0);
    })
  })
