exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments("user_id");
      table
        .string("user_username", 128)
        .unique()
        .notNullable();
      table.varchar("user_password").notNullable();
      table.string("user_email", 128).notNullable();
      table.varchar("user_location", 240).notNullable();
    })
    .createTable("restaurants", table => {
      table.increments("restaurant_id");
      table
        .string("restaurant_name", 128)
        .unique()
        .notNullable();
      table.varchar("restaurant_cuisine").notNullable();
      table.varchar("restaurant_hours", 128);
      table.varchar("restaurant_location", 240);
      table.integer("restaurant_rating", 128);
      table.string("restaurant_image", 128); //this will be updated to the proper data type
    })
    .createTable("menu_items", table => {
      table.increments("menu_item_id");
      table.string("menu_item_name", 128).notNullable();
      table
        .string("menu_item_restaurant")
        .unsigned()
        .notNullable()
        .references("restaurant_name")
        .inTable("restaurants")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("menu_item_price", 128);
      table.text("menu_item_review");
      table.integer("menu_item_rating", 128);
      table.string("menu_item_photo", 128); //this will be updated to the proper data type
    })
    .createTable("user_restaurants", table => {
        table.increments("user_restaurant_id");
        table
        .integer("user_restaurant_user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
        table
        .integer("user_restaurant_restaurant_id")
        .unsigned()
        .notNullable()
        .references("restaurant_id")
        .inTable("restaurants")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
        table.text("user_restaurant_review");
      })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("user_restaurants")
    .dropTableIfExists("menu_items")
    .dropTableIfExists("restaurants")
    .dropTableIfExists("users");
};
