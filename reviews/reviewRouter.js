const router = require("express").Router();

const dB = require("./reviewModel");

router.get("/", (req, res) => {
  dB.getAll()
    .then(review => {
      res.status(200).json(review);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The review information could not be retrieved." });
    });
});

router.get("/:id", validateUserRestaurantId, (req, res) => {
  res.status(200).json(req.reviews);
});

router.post("/", validateReview, (req, res) => {
  dB.insert(req.body)
    .then(review => {
      res.status(201).json(review);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error });
    });
});
router.put("/:id", validateUserRestaurantId, validateReview, (req, res) => {
  dB.update(req.reviews.user_restaurant_id, req.body)
    .then(() => {
      res.status(200).json({ ...req.reviews, ...req.body });
    })
    .catch(error => {
      res.status(500).json({
        message: "Could not Update Review: " + error
      });
    });
});

router.delete("/:id", validateUserRestaurantId, (req, res) => {
  dB.remove(req.reviews.user_restaurant_id)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Successfully Deleted",
        deleted: req.reviews
      });
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Could not Delete, Server error: " + error
      });
    });
});

function validateReview(req, res, next) {
  if (Object.keys(req.body).length) {
    if (req.body.user_restaurant_review) {
      next();
    } else {
      res
        .status(400)
        .json({ message: "please enter a review for the restaurant!" });
    }
  } else {
    res.status(400).json({ message: "missing review data" });
  }
}

function validateUserRestaurantId(req, res, next) {
  const { id } = req.params;
  dB.getById(id)
    .then(reviews => {
      if (reviews) {
        req.reviews = reviews;
        next();
      } else {
        res.status(404).json({
          message: "The review with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The review information could not be retrieved." + err
      });
    });
}

module.exports = router;
