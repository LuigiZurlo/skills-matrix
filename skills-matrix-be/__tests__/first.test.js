// we will use supertest to test HTTP requests/responses
const request = require("supertest");

// we also need our app for the correct routes!
const app = require("../dist/");

describe("api/projects GET ", () => {
  test("It should respond with an array of projects", async () => {
    const response = await request(app).get("/v1/projects");
    expect(response.type).toEqual("application/json");
    expect(response.statusCode).toBe(200);
  },20000);
});

describe("api/projects POST ", () => {
  test("It should respond with the created object", async () => {
    const response = await request(app).post("/v1/projects").send(
      {
        "id": 5,
        "name": "provaTest2",
        "project_otp_code": "provaTest2",
        "start_date": "2019-10-30T09:59:58.083Z",
        "end_date": "2019-10-30T09:59:58.083Z"
      }
    );
    expect(response.type).toEqual("application/json");
    expect(response.statusCode).toBe(201);
  });
});
