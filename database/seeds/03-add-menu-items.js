exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("menu_items")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("menu_items").insert([
        {
          menu_item_id: 1,
          menu_item_restaurant: "Pepperoni",
          menu_item_name: "Burrito Del Mar",
          menu_item_price: 2,
          menu_item_rating: 4,
          menu_item_review: "The burrito special was amazing!",
          menu_item_photo: ""
        },
        {
          menu_item_id: 2,
          menu_item_restaurant: "Katz's Deli",
          menu_item_name: "Pastrami Sandwich",
          menu_item_price: 3,
          menu_item_rating: 4,
          menu_item_review: "Piled high with pastrami, but super pricey",
          menu_item_photo: ""
        },
        {
          menu_item_id: 3,
          menu_item_restaurant: "Cafe Americano",
          menu_item_name: "The Saint Louis",
          menu_item_price: 1,
          menu_item_rating: 3,
          menu_item_review: "Pretty good breakfast sandwich - juicy meat, melty cheese, and nicely toasted bagel. Solid, but nothing special.",
          menu_item_photo: ""
        }
      ]);
    });
};
