
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

    res.status(200).json({ menu_itemByUserMenu_itemId: req.menu_item })
  });



  function validateUserMenu_itemId(req, res, next) {

    const { id } = req.params;
    dB.getById(id)
      .then((menu_item) => {
        if (menu_item) {
          req.menu_item = menu_item;
          next();
        }
        else {
          res.status(404).json({ message: "The menu_item with the specified ID does not exist." })
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "The menu_item information could not be retrieved." + err })
      })
  }


module.exports = router