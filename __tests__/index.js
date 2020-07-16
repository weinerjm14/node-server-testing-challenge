const supertest = require("supertest");
const server = require("../index");
const db = require("../data/dbConfig");

beforeEach(async () => {
  // re-run the seeds and start with a fresh database for each test
  await db.seed.run();
});

afterAll(async () => {
  // closes the database connection so the jest command doesn't stall
  await db.destroy();
});

test("get all hobbits", async () => {
  const getHobbits = await supertest(server).get("/hobbits");
  expect(getHobbits.statusCode).toBe(200);
  expect(getHobbits.headers["content-type"]).toBe(
    "application/json; charset=utf-8"
  );
  expect(getHobbits.body.length).toBe(5);
  expect(getHobbits.body[3].name).toBe("Pippin");
});

test("get hobbit by id", async () => {
  const getHobbits = await supertest(server).get("/hobbits/4");
  expect(getHobbits.statusCode).toBe(200);
  expect(getHobbits.headers["content-type"]).toBe(
    "application/json; charset=utf-8"
  );
  expect(getHobbits.body.name).toBe("Pippin");
  expect(getHobbits.body.id).toBe(4);
});
test("get hobbit by id, not found", async () => {
  const getHobbits = await supertest(server).get("/hobbits/10");
  expect(getHobbits.statusCode).toBe(404);
  expect(getHobbits.headers["content-type"]).toBe(
    "application/json; charset=utf-8"
  );
  expect(getHobbits.body.message).toBe("Hobbit not found");
});
test("add new hobbit", async () => {
  const getHobbits = await supertest(server).post("/hobbits").send({
    name: "Gandalf",
    age: 399,
  });
  expect(getHobbits.statusCode).toBe(201);
  expect(getHobbits.headers["content-type"]).toBe(
    "application/json; charset=utf-8"
  );
  expect(getHobbits.body.name).toBe("Gandalf");
  expect(getHobbits.body.id).toBeDefined();
});
test("update hobbit", async () => {
  const getHobbits = await supertest(server).put("/hobbits/3").send({
    name: "Merry the Great",
    age: 222,
  });
  expect(getHobbits.statusCode).toBe(200);
  expect(getHobbits.headers["content-type"]).toBe(
    "application/json; charset=utf-8"
  );
  expect(getHobbits.body.name).toBe("Merry the Great");
  expect(getHobbits.body.age).toBe(222);
});
// test('update hobbit, not found', async () => {
//   const getHobbits = await supertest(server).put('/hobbits/8');
// //   expect(getHobbits.statusCode).toBe(404);
//   expect(getHobbits.headers['content-type']).toBe(
//     'application/json; charset=utf-8'
//   );
//   expect(getHobbits.body.message).toBe('Hobbit not found');
// });
test("delete hobbit", async () => {
  const getHobbits = await supertest(server).delete("/hobbits/3");
  expect(getHobbits.statusCode).toBe(204);
  expect(getHobbits.text).toBe("");
});
