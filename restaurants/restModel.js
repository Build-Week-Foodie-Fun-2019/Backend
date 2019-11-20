const db = require("../database/db-config");

module.exports = {
  getAll,
  getById,
  insert
};

function getAll() {
  return db("restaurants");
}

function getById(restaurant_id) {
  return db("restaurants")
    .where({ restaurant_id })
    .first();
}

function insert(restaurant) {
  return db("restaurants")
    .insert(restaurant)
    .returning([
      "restaurant_id",
      "restaurant_name",
      "restaurant_cuisine",
      "restaurant_location",
      "restaurant_hours",
      "restaurant_rating",
      "restaurant_image"
    ])
    .then(ids => {
      return getById(ids[0]);
    });
}
