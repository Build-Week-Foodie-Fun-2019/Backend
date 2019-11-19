const router = require('express').Router();

const Restaurants = require('./restRouter');
const authenticate = require('../auth/authenticate-middleware');


Restaurants.post('/restaurants', authenticate, (req, res) => {
    const friend = { id: getNextId(), ...req.body };

    friends = [...friends, friend];

    res.send(friends);
});


module.exports = router;