
const router = require('express').Router();

const dB = require('./menuItemModel');

router.get('/', (req, res) => {

    dB.getAll()
        .then((menu_items) => {
            res.status(200).json(menu_items)
        })
        .catch(() => {
            res.status(500).json({ error: "The menu_items information could not be retrieved." })
        })
});


router.get('/:id', validateUserMenu_itemId, (req, res) => {

    res.status(200).json({ reviewByUserMenu_itemId: req.menu_item })
  });



module.exports = router