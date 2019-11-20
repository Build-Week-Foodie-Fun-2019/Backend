
const db = require("../database/db-config");

module.exports = {
    getAll,
    getById,
    insert,
};

function getAll() {
    return db('menu_items');
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