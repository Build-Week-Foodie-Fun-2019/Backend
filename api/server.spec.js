const request = require("supertest");
const server = require("./server");

describe("server", () => {
  describe("[GET] / endpoint", () => {
    test("the db env is testing", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });

    test("should return 400 Bad request because, no credentials provided", async () => {
      const response = await request(server).get("/api/users");
      expect(response.status).toBe(400);
    });

    test("should return 500 because no credentials given", () => {
      return request(server)
        .post("/api/auth/login")
        .then(response => {
          expect(response.status).toBe(500);
        });
    });

    test("with supertest syntax", () => {
      return request(server)
        .get("/")
        .expect(200)
        .expect("Content-Type", /text/);
    });
  });
});
