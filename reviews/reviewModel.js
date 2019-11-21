const db = require("../database/db-config");

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove
};

function getAll() {
    return db('user_restaurants');
}

function getById(user_restaurant_id) {
    return db('user_restaurants')
        .where({ user_restaurant_id })
        .first();
}

function insert(user_restaurant) {
    return db('user_restaurants')
        .insert(user_restaurant, 'user_restaurant_id')
        .then(ids => {
            return getById(ids[0]);
        });
}

function update(user_restaurant_id, changes) {
    return db('user_restaurants')
      .where({ user_restaurant_id })
      .update(changes);
  }
  
  function remove(user_restaurant_id) {
    return db('user_restaurants')
      .where('user_restaurant_id', user_restaurant_id)
      .del();
  }