const router = require("express").Router();

const dB = require("./menuItemModel");

router.get("/", (req, res) => {
  dB.getAll()
    .then(menu_items => {
      res.status(200).json(menu_items);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The menu_items information could not be retrieved." });
    });
});

router.get("/:id", validateUserMenu_itemId, (req, res) => {
  res.status(200).json(req.menu_item);
});

router.post("/", validateMenuItem, (req, res) => {
  dB.insert(req.body)
    .then(menuItem => {
      res.status(201).json(menuItem);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error });
    });
});

router.put("/:id", validateUserMenu_itemId, validateMenuItem, (req, res) => {
  dB.update(req.menu_item.menu_item_id, req.body)
    .then(() => {
      res.status(200).json({ ...req.menu_item, ...req.body });
    })
    .catch(error => {
      res.status(500).json({
        message: "Could not Update Menu Item: " + error
      });
    });
});

router.delete("/:id", validateUserMenu_itemId, (req, res) => {
  dB.remove(req.menu_item.menu_item_id)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Successfully Deleted",
        deleted: req.menu_item
      });
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Could not Delete, Server error: " + error
      });
    });
});

function validateMenuItem(req, res, next) {
  if (Object.keys(req.body).length) {
    req.menuItem = req.body;
    dB.insert(req.body)
      .then(() => {
        next();
      })
      .catch(err => {
        res
          .status(400)
          .json({
            errorMessage:
              "Please provide menu_item_name for the menuItem." + err
          });
      });
  } else {
    dB.insert(req.body).catch(err => {
      res
        .status(500)
        .json({
          error:
            "There was an error while saving the menuItem to the database" + err
        });
    });
  }
}

function validateUserMenu_itemId(req, res, next) {
  const { id } = req.params;
  dB.getById(id)
    .then(menu_item => {
      if (menu_item) {
        req.menu_item = menu_item;
        next();
      } else {
        res
          .status(404)
          .json({
            message: "The menu_item with the specified ID does not exist."
          });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: "The menu_item information could not be retrieved." + err
        });
    });
}

module.exports = router;
