const router = require('express').Router();

const Users = require('./userModel');
const authenticate = require('../auth/authenticate-middleware');

router.get('/', authenticate, (req, res) => {
    if (req.decodedToken.roles.includes("users")) {
        Users.getAllUsers()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                res.status(200).json(err.message)
            });
    } else {
        res.json({
            message: "You don't have the right role to access this information"
        });
    }
});

router.get('/:id', authenticate, (req, res) => {
    let { id } = req.params;
    Users.findById(id)
        .then((user) => {

            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
            res.status(200).json({ user: user })
        })
        .catch((err) => {
            res.status(500).json({ message: "You don't have the right role to access this information" + err })
        })
   
});



module.exports = router;
