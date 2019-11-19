const router = require('express').Router();

const dB = require('./restModel');

router.get('/', (req, res) => {

    dB.getAll()
        .then((restaurants) => {
            res.status(200).json(restaurants)
        })
        .catch(() => {
            res.status(500).json({ error: "The restaurants information could not be retrieved." })
        })
});

router.get('/:id', validateRestaurantId, (req, res) => {

    res.status(200).json({ restaurant: req.restaurant })
});

router.post('/', validateRestaurant, (req, res) => {
    // let { restaurants_name, restaurants_cusine, restaurant_hours, restaurant_location, restaurant_rating, restaurant_image } = req.body;

    const restaurant = req.body;
    const { url } = req;
    res.status(201).json({ postedRestaurant: restaurant, url: url, operation: "POST" })
});


function validateRestaurantId(req, res, next) {

    const { id } = req.params;
    dB.getById(id)
        .then((restaurants) => {
            if (restaurants) {
                req.restaurants = restaurants;
                next();
            }
            else {
                res.status(404).json({ message: "The restaurant with the specified ID does not exist." })
            }
        })
        .catch((err) => {
            res.status(500).json({ error: "The restaurant information could not be retrieved." + err })
        })
}


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