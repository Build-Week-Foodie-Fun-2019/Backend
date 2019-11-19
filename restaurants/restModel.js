const db = require("../database/db-config");

module.exports = {
    getAll,
    getById,
    // getUserPosts,
    insert,
    // update,
    // remove,
  };

  function getAll() {
    return db('restaurants');
  }

  function getById(restaurant_id) {
    return db('restaurants')
      .where({ restaurant_id })
      .first();
  }

  function insert(restaurant) {
    return db('restaurants')
      .insert(restaurant)
      .then(ids => {
        return getById(ids[0]);
      });
  }