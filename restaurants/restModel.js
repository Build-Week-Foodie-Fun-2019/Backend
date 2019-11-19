const db = require("../database/db-config");

module.exports = {
    // get,
    getById,
    // getUserPosts,
    insert,
    // update,
    // remove,
  };

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