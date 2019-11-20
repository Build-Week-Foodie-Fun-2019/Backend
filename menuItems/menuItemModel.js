
const db = require("../database/db-config");

module.exports = {
    getAll,
    getById,
    insert,
};

function getAll() {
    return db('menu_items');
}

function getById(menu_item_id) {
    return db('menu_items')
        .where({ menu_item_id })
        .first();
}

function insert(menu_item) {
    return db('menu_items')
        .insert(menu_item)
        .then(ids => {
            return getById(ids[0]);
        });
}