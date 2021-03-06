
const db = require("../database/db-config");

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove
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
        .insert(menu_item, "menu_item_id")
        .then(ids => {
            return getById(ids[0]);
        });
}

function update(menu_item_id, changes) {
  return db('menu_items')
    .where({ menu_item_id })
    .update(changes);
}

function remove(menu_item_id) {
  return db('menu_items')
    .where('menu_item_id', menu_item_id)
    .del();
}