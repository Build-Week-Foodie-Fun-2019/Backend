const Users = require("./userModel");
const db = require("../database/db-config");

beforeEach(() => {
  return db("users").truncate();
});

describe("users model", () => {
  describe("insert function", () => {
    it("should insert a user", async () => {
      await Users.add({
        user_username: "iffy_oak",
        user_password: "c00l_pa$$word",
        user_email: "ifiok@email.com",
        user_location: "Calabar, Cross River State, NG"
      });
      await Users.add({
        user_username: "josh_armantrout",
        user_password: "p4$$w0rd",
        user_email: "josh.armantrout@email.com",
        user_location: "Richmond, Virginia, US"
      });

      const users = await db("users");
      expect(users).toHaveLength(2);
    });

    it("should not post user with an existing name", async () => {
      try {
        await Users.add({
          user_username: "josh_armantrout",
          user_password: "p4$$w0rd",
          user_email: "josh.armantrout@email.com",
          user_location: "Richmond, Virginia, US"
        });
        await Users.add({
          user_username: "josh_armantrout",
          user_password: "p4$$w0rd",
          user_email: "josh.armantrout@email.com",
          user_location: "Richmond, Virginia, US"
        });
      } catch (error) {
        expect(error.code).toBe("SQLITE_CONSTRAINT");
      }
    });
  });
});
