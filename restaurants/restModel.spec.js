const rest = require("./restModel");
const db = require("../database/db-config");

beforeEach(() => {
  return db("restaurants").truncate();
});

describe("restaurant model", () => {
  describe("insert function", () => {
    it("should insert a restaurant", async () => {
      await rest.insert({
        restaurant_name: "Pepperoni",
        restaurant_cuisine: "Mexican",
        restaurant_location: "Richmond, VA",
        restaurant_hours: "M - Sa 11a - 9p, Su 12p - 7p",
        restaurant_rating: 4,
        restaurant_image: ""
      });
      await rest.insert({
        restaurant_name: "Cafe Americano",
        restaurant_cuisine: "Bistro",
        restaurant_location: "St. Louis, Missouri",
        restaurant_hours: "M - Su - 7a - 10p",
        restaurant_rating: 3,
        restaurant_image: ""
      });

      const restaurants = await db("restaurants");
      expect(restaurants).toHaveLength(2);
    });

    it("should not post restaurant with an existing name", async () => {
      try {
        await rest.insert({
          restaurant_name: "Pepperoni",
          restaurant_cuisine: "Mexican",
          restaurant_location: "Richmond, VA",
          restaurant_hours: "M - Sa 11a - 9p, Su 12p - 7p",
          restaurant_rating: 4,
          restaurant_image: ""
        });
        await rest.insert({
          restaurant_name: "Pepperoni",
          restaurant_cuisine: "Mexican",
          restaurant_location: "Richmond, VA",
          restaurant_hours: "M - Sa 11a - 9p, Su 12p - 7p",
          restaurant_rating: 4,
          restaurant_image: ""
        });
      } catch (error) {
        expect(error.code).toBe("SQLITE_CONSTRAINT");
      }
    });
  });
});
