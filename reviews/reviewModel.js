const db = require("../database/db-config");

module.exports = {
    getAll,
    getById,
    insert,
};

function getAll() {
    return db('user_restaurants');
}

function getById(user_restaurant_id) {
    return db('user_restaurants')
        .where({ user_restaurant_id })
        .first();
}

function insert(user_restaurants) {
    return db('user_restaurants')
        .insert(user_restaurants)
        .then(ids => {
            return getById(ids[0]);
        });
}