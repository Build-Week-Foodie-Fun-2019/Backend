
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/userModel');

router.post('/register', (req, res) => {
    // implement registration
    let user = req.body;
      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;
  
      Users.add(user)
          .then(saved => {
              res.status(201).json(saved);
          })
          .catch(error => {
              res.status(500).json(error);
          });
  
  });



  module.exports = router;