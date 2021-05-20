const axios = require("../config/axios");
const config = require("config");
const { initializeDB, clearDB } = require("./initFunc");

describe("API tests", () => {
  beforeAll(async () => {
    return await initializeDB(config.get("testUser.email"));
  });
  afterAll(async () => {
    return await clearDB(config.get("testUser.email"));
  });

  test("POST /api/v1/auth/register create test user", async () => {
    const response = await axios.post(
      "/api/v1/auth/register",
      config.get("testUser")
    );
    expect(response.status).toBe(201);
  });

  //   test("GET /api/v1/notes/ response 401", async () => {
  //     const response = await axios.get("/api/v1/notes/");
  //     expect(response.statusCode).toBe(401);
  //   });

  test("GET /api/v1/nodes/10 shared note", async () => {
    const note10 = await axios.get("/api/v1/notes/10");
    expect(note10.length).not.toBe(0);
  });
});
