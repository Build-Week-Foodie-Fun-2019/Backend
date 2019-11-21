
const db = require("../database/db-config");

module.exports = {
  add,
  findBy,
  findById,
  getAllUsers,
  getAllRestaurantsByUser

};

async function add(user) {
  const [user_id] = await db("users")
    .insert(user, "user_id")
  // .returning([
  //   "user_id",
  //   "user_username",
  //   "user_password",
  //   "user_email",
  //   "user_location"
  // ]);
  console.log(user_id)

  const newUser = await findById(user_id)
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

function getAllRestaurantsByUser(user_restaurant_user_id ) {
  return db.select("restaurant_name")
    .from("restaurants")
    .join("user_restaurants")
    .where("user_restaurants.user_restaurant_user_id", "=", user_restaurant_user_id )
}
