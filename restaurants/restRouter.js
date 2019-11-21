const router = require("express").Router();

const dB = require("./restModel");

router.get("/", (req, res) => {
  dB.getAll()
    .then(restaurants => {
      res.status(200).json(restaurants);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The restaurants information could not be retrieved." });
    });
});

router.get("/:id", validateRestaurantId, (req, res) => {
  res.status(200).json(req.restaurants);
});

router.post("/", validateRestaurant, (req, res) => {
  dB.insert(req.body)
    .then(restaurant => {
      res.status(201).json(restaurant);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error });
    });
});

router.delete("/:id", validateRestaurantId, (req, res) => {
  dB.remove(req.restaurants.restaurant_id)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Successfully Deleted",
        deleted: req.restaurants
      });
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Could not Delete, Server error: " + error
      });
    });
});

router.put("/:id", validateRestaurantId,validateRestaurant, (req, res) => {
  dB.update(req.restaurants.restaurant_id, req.body)
    .then(() => {
      res.status(200).json({ ...req.restaurants, ...req.body });
    })
    .catch(error => {
      res.status(500).json({
        message: "Could not Update Restaurant: " + error
      });
    });
});

//middleware
function validateRestaurantId(req, res, next) {
  const { id } = req.params;
  dB.getById(id)
    .then(restaurants => {
      if (restaurants) {
        req.restaurants = restaurants;
        next();
      } else {
        res.status(404).json({
          message: "The restaurant with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The restaurant information could not be retrieved." + err
      });
    });
}

function validateRestaurant(req, res, next) {
  if (Object.keys(req.body).length) {
    if (req.body.restaurant_name && req.body.restaurant_cuisine) {
      next();
    } else {
      res
        .status(400)
        .json({ message: "fill in the fields that are required!" });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

module.exports = router;
