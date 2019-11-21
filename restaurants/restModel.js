const db = require("../database/db-config");

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove
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
    .insert(restaurant, "restaurant_id")
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(restaurant_id, changes) {
  return db('restaurants')
    .where({ restaurant_id })
    .update(changes);
}

function remove(restaurant_id) {
  return db('restaurants')
    .where('restaurant_id', restaurant_id)
    .del();
}