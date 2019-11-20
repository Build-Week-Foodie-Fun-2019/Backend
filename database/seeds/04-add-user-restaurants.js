exports.seed = function(knex) {

      return knex("user_restaurants").insert([
        {
          user_restaurant_id: 1,
          user_restaurant_user_id: 1,
          user_restaurant_restaurant_id: 2,
          user_restaurant_review:
            "Great but pricey sandwiches. Worth the long wait."
        },
        {
          user_restaurant_id: 2,
          user_restaurant_user_id: 1,
          user_restaurant_restaurant_id: 1,
          user_restaurant_review:
            "Great food and friendly staff! I’ll be back!"
        },
        {
          user_restaurant_id: 3,
          user_restaurant_user_id: 2,
          user_restaurant_restaurant_id: 1,
          user_restaurant_review:
            "Okay coffee and better than average breakfast sandwiches."
        },
      ]);
   
};
