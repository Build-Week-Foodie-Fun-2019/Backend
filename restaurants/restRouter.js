const router = require('express').Router();

const dB = require('./restModel');

// Restaurants.post('/restaurants', (req, res) => {
//     let { restaurants_name, restaurants_cusine, restaurant_hours, restaurant_location, restaurant_rating, restaurant_image } = req.body;
   
// });
router.post('/', validateUser, (req, res) => {
    // let { restaurants_name, restaurants_cusine, restaurant_hours, restaurant_location, restaurant_rating, restaurant_image } = req.body;
   
    const user = req.body;
    const { url } = req;
    res.status(201).json({ postedContent: user, url: url, operation: "POST" })
  });

  function validateUser(req, res, next) {

    if (Object.keys(req.body).length) {
      req.user = req.body;
      dB.insert(req.body)
        .then(() => {
          next()
        })
        .catch((err) => {
          res.status(400).json({ errorMessage: "Please provide name for the user." + err })
  
        })
    }
    else {
      dB.insert(req.body).catch((err) => {
        res.status(500).json({ error: "There was an error while saving the user to the database" + err })
      })
    }
  }

module.exports = router;