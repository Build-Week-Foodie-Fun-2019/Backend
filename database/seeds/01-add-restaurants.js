exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("restaurants")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("restaurants").insert([
        {
          restaurant_id: 1,
          restaurant_name: "Pepperoni",
          restaurant_cuisine: "Mexican",
          restaurant_location: "Richmond, VA",
          restaurant_hours: "M - Sa 11a - 9p, Su 12p - 7p",
          restaurant_rating: 4,
          restaurant_image: ""
        },
        {
          restaurant_id: 2,
          restaurant_name: "Cafe Americano",
          restaurant_cuisine: "Bistro",
          restaurant_location: "St. Louis, Missouri",
          restaurant_hours: "M - Su - 7a - 10p",
          restaurant_rating: 3,
          restaurant_image: ""
        },
        {
          restaurant_id: 3,
          restaurant_name: "Katz's Deli",
          restaurant_cuisine: "Deli",
          restaurant_location: "Manhattan, NY",
          restaurant_hours: "M - Su 8am - 11pm",
          restaurant_rating: 5,
          restaurant_image: ""
        }
      ]);
    });
};
