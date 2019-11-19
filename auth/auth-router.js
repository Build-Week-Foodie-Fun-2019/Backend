
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/userModel');

router.post('/register', (req, res) => {
    // implement registration
    let user = req.body;
      const hash = bcrypt.hashSync(user.user_password, 10);
      user.user_password = hash;
  
      Users.add(user)
          .then(saved => {
              res.status(201).json(saved);
          })
          .catch(error => {
              res.status(500).json("error" + error);
          });
  
  });



router.post('/login', (req, res) => {
    // implement login
  
    let { username, password } = req.body;
  
      Users.findBy({ username })
          .first()
          .then(user => {
              if (user && bcrypt.compareSync(password, user.password)) {
                  const token = generateToken(user);
                  res.status(200).json({
                      message: `Welcome ${user.username}!`,
                      token: token,
                  });
              } else {
                  res.status(401).json({ message: 'Invalid Credentials' });
              }
          })
          .catch(error => {
              res.status(500).json(error.message);
          });
  
  });



  module.exports = router;