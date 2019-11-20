
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




module.exports = router;