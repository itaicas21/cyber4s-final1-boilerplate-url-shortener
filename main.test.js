const request = require("supertest");
const app = require("./app");
const assert = require("assert");
let testData = require("./backend/testShortURLS.json"); // doesn't update after updated database
const shortID = "sNx6Cv-SwKJMTeyNArQZs"; // Google.com shortID
const badShortID = "sNx6Cv-SwKJMTeyNArQZssdfs";
const testSentNewURL = "https://discord.com/";
const testSentExistURL = "https://www.google.com"; // google.com url
const testBadInput = "blahblahblah";
const testSentBadURL = "https://discodfgdfgdfgrd.com/";

describe("stats route", () => {
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

  it("Returns ShortId not found for badID", (done) => {
    request(app)
      .get(`/api/statistics/${badShortID}`)
      .expect(200)
      .then((res) => {
        assert(res.text === "ShortID Not Found");
        done();
      });
  });
});

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
      request(app)
        .get(`/${badShortID}`)
        .expect(200)
        .then((res) => {
          assert(res.text === "Not Found");
          done();
        });
    });
  });
});

describe("shortURL route", () => {
  it("is not a valid URL", (done) => {
    request(app)
      .post("/api/shorturl/new")
      .send({ url: testBadInput })
      .type("form")
      .then((resp) => {
        assert(resp.text === "Invalid URL");
        done();
      });
  });

  it("URL does not exist", (done) => {
    request(app)
      .post("/api/shorturl/new")
      .send({ url: testSentBadURL })
      .type("form")
      .expect(404)
      .then((resp) => {
        assert(resp.body.code === "ENOTFOUND");
        done();
      });
  });

  it("shortID exists", (done) => {
    request(app)
      .post("/api/shorturl/new")
      .send({ url: testSentExistURL })
      .type("form")
      .expect(200)
      .then((resp) => {
        assert(
          resp.body.short_ID ===
            testData.find((entry) => {
              return entry.short_ID === shortID;
            }).short_ID
        );
        done();
      });
  });

  it("shortID created", (done) => {
    request(app)
      .post("/api/shorturl/new")
      .send({ url: testSentNewURL })
      .type("form")
      .expect(201)
      .then((resp) => {
        // assert(
        //   resp.body ===
        // );
        done();
      });
  });
});
