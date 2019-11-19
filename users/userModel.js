const db = require("../database/db-config");

module.exports = {
  add,
  findBy,
  findById,
  getAllUsers
};

async function add(user) {
  const [user_id] = await db("users")
    .insert(user)
    .returning([
      "user_id",
      "user_username",
      "user_password",
      "user_email",
      "user_location"
    ]);

  return user_id;
}

function findById(user_id) {
  return db("users")
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

