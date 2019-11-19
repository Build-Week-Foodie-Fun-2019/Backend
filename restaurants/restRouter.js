const router = require('express').Router();

const dB = require('./restModel');

router.post('/', validateRestaurant, (req, res) => {
    // let { restaurants_name, restaurants_cusine, restaurant_hours, restaurant_location, restaurant_rating, restaurant_image } = req.body;
   
    const restaurant = req.body;
    const { url } = req;
    res.status(201).json({ postedRestaurant: restaurant, url: url, operation: "POST" })
  });

  function validateRestaurant(req, res, next) {

    if (Object.keys(req.body).length) {
      req.restaurant = req.body;
      dB.insert(req.body)
        .then(() => {
          next()
        })
        .catch((err) => {
          
            res.status(400).json({ errorMessage: "Please provide restaurant_name for the restaurant." + err })
  
        })
    }
    else {
      dB.insert(req.body).catch((err) => {
        res.status(500).json({ error: "There was an error while saving the restaurant to the database" + err })
      })
    }
  }

module.exports = router;