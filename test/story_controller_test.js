const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const Story = require("../models/story");

describe("Story controller", () => {
  it("Get on /stories : and get  a list of stories without params", done => {
    const tuto0 = new Story({ title: "tuto0", code: "tuto0" });
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

  it("Get on /stories?isOfficial=true : and get a list of stories with official=true", done => {
    const tuto0 = new Story({
      title: "tuto0",
      code: "tuto0",
      isOfficial: true
    });
    const perso0 = new Story({ title: "perso0", code: "perso0" });

    Promise.all([tuto0.save(), perso0.save()]).then(() => {
      request(app)
        .get("/stories?isOfficial=true")
        .end((err, res) => {
          assert(res.status === 200);
          assert(res.body.length === 1);
          assert(res.body[0].title == "tuto0");
          done();
        });
    });
  });

  it("Get on /story/:id : and get a unique of story by _id", done => {
    const tuto0 = new Story({ title: "tuto0", code: "tuto0" });
    const perso0 = new Story({ title: "perso0", code: "perso0" });

    Promise.all([tuto0.save(), perso0.save()]).then(() => {
      request(app)
        .get(`/story/${tuto0._id}`)
        .end((err, res) => {
          assert(res.status === 200);
          assert(res.body[0].title == "tuto0");
          done();
        });
    });
  });

  it("Get on /story/:storyCode/page/:pageCode : and get a unique page", done => {
    const tuto0 = new Story({
      title: "tuto0",
      code: "tuto0",
      pages: [
        { title: "Page 1", code: "page1" },
        { title: "Page 2", code: "page2" }
      ]
    });
    const perso0 = new Story({ title: "perso0", code: "perso0" });

    Promise.all([tuto0.save(), perso0.save()]).then(() => {
      request(app)
        .get(`/story/tuto0/page/page1`)
        .end((err, res) => {
          assert(res.status === 200);
          done();
        });
    });
  });

  it("PUT a story to /story : create a story on DB", done => {
    Story.count().then(beforeCount => {
      request(app)
        .put("/story")
        .send({ title: "Tuto$ 1" })
        .end((err, res) => {
          assert(res.status === 200);
          Story.count().then(afterCount => {
            assert(afterCount === beforeCount + 1);
            Story.findOne({ title: "Tuto$ 1" }).then(story => {
              //Test la génération du code à partir du titre
              assert(story.code === "tuto1");
              done();
            });
          });
        });
    });
  });
});
