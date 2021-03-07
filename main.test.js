const request = require("supertest");
const app = require("./app");
const assert = require("assert");
let testData = require("./backend/testShortURLS.json");
const shortID = "sNx6Cv-SwKJMTeyNArQZs"; // Google shortID

describe("App Endpoint Tests", () => {
  it("Recieves all saved websites", (done) => {
    request(app)
      .get("/saved")
      .expect(200)
      .then((res) => {
        assert.deepStrictEqual(testData, res.body);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  describe("shortID endpoint", () => {
    it("Redirects to matching URL based on short", (done) => {
      request(app)
        .get(`/${shortID}`)
        .expect(303)
        .then(() => {
          done();
        });
    });
    it("Sends NO ID if id not shortened", (done) => {
      const shortID = "sNx6Cv-SwKJMTeyNArQZssdfs";
      request(app)
        .get(`/${shortID}`)
        .expect(200)
        .then((res) => {
          assert(res.text === "Not Found");
          done();
        });
    });
  });
});

describe("stats route", () => {
  testData = require("./backend/testShortURLS.json");
  it("Returns Stats for specific shortID", (done) => {
    request(app)
      .get(`/api/statistics/${shortID}`)
      .expect(200)
      .then((res) => {
        assert.deepStrictEqual(
          res.body,
          testData.find((entry) => {
            return entry.short_ID === shortID;
          })
        );
        done();
      });
  });
});

describe;
