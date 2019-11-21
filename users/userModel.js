
const db = require("../database/db-config");

module.exports = {
  add,
  findBy,
  findById,
  getAllUsers,
  update,
  remove,
  getAllRestaurantsByUser
};

async function add(user) {
  const [user_id] = await db("users").insert(user, "user_id");
  const newUser = await findById(user_id);
  return newUser;
}

function findById(user_id) {
  return db("users")
    .select(
      "user_id",
      "user_username",
      "user_email",
      "user_location"
    )
    .where({ user_id })
    .first();
}

function findBy(filter) {
  return db("users").where(filter);
}

function getAllUsers() {
  return db("users").select(
    "user_id",
    "user_username",
    "user_email",
    "user_location"
  );
}

function update(user_id, changes) {
  return db("users")
    .where({ user_id })
    .update(changes);
}

function remove(user_id) {
  return db("users")
    .where("user_id", user_id)
    .del();

}
function getAllRestaurantsByUser(user_restaurant_user_id ) {
  return db.select("restaurant_name")
    .from("restaurants")
    .join("user_restaurants")
    .where("user_restaurants.user_restaurant_user_id", "=", user_restaurant_user_id )
}