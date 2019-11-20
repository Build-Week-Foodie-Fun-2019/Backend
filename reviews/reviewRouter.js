
const router = require('express').Router();

const dB = require('./reviewModel');

router.get('/', (req, res) => {

    dB.getAll()
        .then((menu_items) => {
            res.status(200).json(menu_items)
        })
        .catch(() => {
            res.status(500).json({ error: "The menu_items information could not be retrieved." })
        })
});


router.post('/', validateReview, (req, res) => {

    const review = req.body;
    const { url } = req;
    res.status(201).json({ postedReview: review, url: url, operation: "POST" })
});

function validateReview(req, res, next) {

    if (Object.keys(req.body).length) {
        req.review = req.body;
        dB.insert(req.body)
            .then(() => {
                next()
            })
            .catch((err) => {

                res.status(400).json({ errorMessage: "Please provide restaurant_name for the review." + err })

            })
    }
    else {
        dB.insert(req.body).catch((err) => {
            res.status(500).json({ error: "There was an error while saving the review to the database" + err })
        })
    }
}

module.exports = router;