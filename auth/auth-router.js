
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
  
    let { user_username, user_password } = req.body;
  
      Users.findBy({ user_username })
          .first()
          .then(user => {
              if (user && bcrypt.compareSync(user_password, user.user_password)) {
                  const token = generateToken(user);
                  res.status(200).json({
                      message: `${user.user_username} Welcome to Foodie Fun!`,
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



  function generateToken(user) {
    const payload = {
        subject: user.id,
        user_username: user.user_username,
      //   roles: ['student']
    }
    const options = {
        expiresIn: '1d',
    }
  
    const result = jwt.sign(
        payload,
        // process.env.NODE_ENV === 'development' ? 'devsecret' : process.env.SECRET,
        'THIS IS THE SECRET',
        options,
    )
  
    return result;
  }


  module.exports = router;