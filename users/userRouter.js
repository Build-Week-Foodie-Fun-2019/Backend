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

router.get("/:user_restaurant_user_id/userRestaurant", (req, res) => {
    const { user_restaurant_user_id  } = req.params;
    const { url } = req;

    Users.getAllRestaurantsByUser(user_restaurant_user_id)
        .then((userRestaurant) => {

            if (userRestaurant.length === 0) {
                res.status(404).json({ message: "The userRestaurant with the specified ID does not exist." })
            }
            res.status(200).json({ userRestaurantInfo: userRestaurant, url: url, operation: "GET" })
        })
        .catch((err) => {
            res.status(500).json({ error: "The userRestaurant information could not be retrieved." + err })
        })
})


router.get("/:user_restaurant_user_id/userReviews", (req, res) => {
    const { user_restaurant_user_id  } = req.params;
    const { url } = req;

    Users.getAllReviewsByUser(user_restaurant_user_id)
        .then((userRestaurant) => {

            if (userRestaurant.length === 0) {
                res.status(404).json({ message: "The userRestaurant with the specified ID does not exist." })
            }
            res.status(200).json({ userRestaurantInfo: userRestaurant, url: url, operation: "GET" })
        })
        .catch((err) => {
            res.status(500).json({ error: "The userRestaurant information could not be retrieved." + err })
        })
})


router.get("/:user_restaurant_user_id/:restaurant_cuisine/userCuisine", (req, res) => {
    const { user_restaurant_user_id, restaurant_cuisine} = req.params;
    const { url } = req;
    // const restaurant_cuisine ="Bistro"
    

    Users.getAllCuisineByUser(user_restaurant_user_id, restaurant_cuisine)
        .then((userRestaurant) => {

            if (userRestaurant.length === 0) {
                res.status(404).json({ message: "The userRestaurant with the specified ID does not exist." })
            }
            res.status(200).json({ userRestaurantInfo: userRestaurant, url: url, operation: "GET" })
        })
        .catch((err) => {
            res.status(500).json({ error: "The userRestaurant information could not be retrieved." + err })
        })
})

router.get("/:user_restaurant_user_id/:menu_item_price/userPrice", (req, res) => {
    const { user_restaurant_user_id, menu_item_price} = req.params;
    const { url } = req;  

    Users.getAllPricesByUser(user_restaurant_user_id, menu_item_price)
        .then((userRestaurant) => {

            if (userRestaurant.length === 0) {
                res.status(404).json({ message: "The userRestaurant with the specified ID does not exist." })
            }
            res.status(200).json({ userRestaurantInfo: userRestaurant, url: url, operation: "GET" })
        })
        .catch((err) => {
            res.status(500).json({ error: "The userRestaurant information could not be retrieved." + err })
        })
})


router.get("/:user_restaurant_user_id/:restaurant_rating/userRating", (req, res) => {
    const { user_restaurant_user_id, restaurant_rating} = req.params;
    const { url } = req;  

    Users.getAllRatingsByUser(user_restaurant_user_id, restaurant_rating)
        .then((userRestaurant) => {

            if (userRestaurant.length === 0) {
                res.status(404).json({ message: "The userRestaurant with the specified ID does not exist." })
            }
            res.status(200).json({ userRestaurantInfo: userRestaurant, url: url, operation: "GET" })
        })
        .catch((err) => {
            res.status(500).json({ error: "The userRestaurant information could not be retrieved." + err })
        })
})


router.get("/:user_restaurant_user_id/:restaurant_name/userRestaurantName", (req, res) => {
    const { user_restaurant_user_id, restaurant_name} = req.params;
    const { url } = req;  

    Users.getAllRestaurantNameByUser(user_restaurant_user_id, restaurant_name)
        .then((userRestaurant) => {

            if (userRestaurant.length === 0) {
                res.status(404).json({ message: "The userRestaurant with the specified ID does not exist." })
            }
            res.status(200).json({ userRestaurantInfo: userRestaurant, url: url, operation: "GET" })
        })
        .catch((err) => {
            res.status(500).json({ error: "The userRestaurant information could not be retrieved." + err })
        })
})


module.exports = router;
