
const db = require("../database/db-config");

module.exports = {
  add,
  findBy,
  findById,
  getAllUsers,
  update,
  remove,
  getAllRestaurantsByUser,
  getAllReviewsByUser,
  getAllCuisineByUser,
  getAllPricesByUser,
  getAllRatingsByUser,
  getAllRestaurantNameByUser
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


function getAllReviewsByUser(user_restaurant_user_id ) {
  return db.select("restaurant_name", "user_restaurant_review")
    .from("restaurants")
    .join("user_restaurants", "restaurants.restaurant_id", "=", "user_restaurants.user_restaurant_restaurant_id")
    .where("user_restaurants.user_restaurant_user_id", "=", user_restaurant_user_id )
}

//////by review
// select restaurant_name, user_restaurant_review
// from restaurants
// join user_restaurants on restaurants.restaurant_id = user_restaurants.user_restaurant_restaurant_id

// where user_restaurant_user_id = 4


function getAllCuisineByUser(user_restaurant_user_id, restaurant_cuisine) {
  return db.select("restaurant_name", "restaurant_cuisine")
    .from("restaurants")
    .join("user_restaurants", "restaurants.restaurant_id", "=", "user_restaurants.user_restaurant_restaurant_id")
    .where("user_restaurants.user_restaurant_user_id", "=", user_restaurant_user_id,
    )
    .andWhere("restaurants.restaurant_cuisine", "=", restaurant_cuisine)
}
//////by cuisine

// select restaurant_name, restaurant_cuisine 
// from restaurants
// join user_restaurants on restaurants.restaurant_id = user_restaurants.user_restaurant_restaurant_id
// where user_restaurant_user_id = 8 and restaurant_cuisine = "oug fb qfbhwfwv"



function getAllPricesByUser(user_restaurant_user_id, menu_item_price) {
  return db.select("restaurant_name", "menu_item_price", "user_restaurant_user_id")
    .from("menu_items")
    .join("restaurants", "menu_items.menu_item_restaurant", "=", "restaurants.restaurant_name")
    .join ("user_restaurants") 
    .where("user_restaurants.user_restaurant_user_id", "=", user_restaurant_user_id) .andWhere("menu_items.menu_item_price", "=", menu_item_price)
}
////by price

// select 
// restaurant_name,
// menu_item_price,
// user_restaurant_user_id
// from menu_items
// join restaurants on menu_items.menu_item_restaurant = restaurants.restaurant_name
// join user_restaurants 
// where user_restaurant_user_id = 2  and menu_item_price = 1




function getAllRatingsByUser(user_restaurant_user_id, restaurant_rating) {
  return db.select("restaurant_name", "restaurant_rating", "user_restaurant_user_id")
    .from("menu_items")
    .join("restaurants", "menu_items.menu_item_restaurant", "=", "restaurants.restaurant_name")
    .join("user_restaurants") 
    .where("user_restaurants.user_restaurant_user_id", "=", user_restaurant_user_id)
    .andWhere("restaurant_rating", "=", restaurant_rating)
}
////by rating

// select 
// restaurant_name,
// restaurant_rating,
// user_restaurant_user_id
// from menu_items
// join restaurants on menu_items.menu_item_restaurant = restaurants.restaurant_name
// join user_restaurants 
// where user_restaurant_user_id = 2  and restaurant_rating = 4


function getAllRestaurantNameByUser(user_restaurant_user_id, restaurant_name) {
  return db.select("restaurant_name", "user_restaurant_user_id")
    .from("menu_items")
    .join("restaurants", "menu_items.menu_item_restaurant", "=", "restaurants.restaurant_name")
    .join("user_restaurants") 
    .where("user_restaurants.user_restaurant_user_id", "=", user_restaurant_user_id).andWhere("restaurant_name", "=", restaurant_name)
}
/////by restaurant name

// select 
// restaurant_name,
// user_restaurant_user_id
// from menu_items
// join restaurants on menu_items.menu_item_restaurant = restaurants.restaurant_name
// join user_restaurants 
// where user_restaurant_user_id = 1  and restaurant_name = "Pepperoni"
