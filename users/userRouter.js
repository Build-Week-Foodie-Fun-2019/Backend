const router = require('express').Router();

const Users = require('./userModel');
const authenticate = require('../auth/authenticate-middleware');

const requestOptions = {
    headers: { accept: 'application/json' },
  };

router.get('/', authenticate, (req, res) => {
    // let { user_id } = req.body;
  if (req.decodedToken.roles.includes("users")) {
    Users.getAllUsers()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.send(err)
      });
  } else {
    res.json({
      message: "You don't have the right role to access this information"
    });
  }
});

module.exports = router;
