const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const story = require("../models/story");

describe("Story controller", () => {
  it("Get a list of story without params", done => {
    const tuto0 = new story({ title: "tuto0", code: "tuto0" });
    tuto0.save().then(() => {
      request(app)
        .get("/stories")
        .end((err, res) => {
          assert(res.status === 200);
          assert(res.body[0].title == "tuto0");
          done();
        });
    });
  });
});
