
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


module.exports = router;