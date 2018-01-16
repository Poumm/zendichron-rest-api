const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const Story = require("../models/story");

describe("Story controller", () => {
  it("Get on /stories : and get  a list of stories without pages", done => {
    request(app)
      .get("/stories")
      .end((err, res) => {
        assert(res.status === 200);
        assert(res.body.length === 2);
        res.body.map(story => {
          assert((story.pages = []));
        });
        done();
      });
  });

  it("Get on /stories?isOfficial=true : and get a list of stories with official=true", done => {
    request(app)
      .get("/stories?isOfficial=true")
      .end((err, res) => {
        assert(res.status === 200);
        assert(res.body.length === 1);
        assert(res.body[0].title == "tuto0");
        done();
      });
  });

  it("Get on /story/:id : and get a unique of story by _id", done => {
    Story.findOne({ code: "tuto0" }).then(tuto0 => {
      request(app)
        .get(`/story/${tuto0._id}`)
        .end((err, res) => {
          assert(res.status === 200);
          assert(res.body.title == "tuto0");
          done();
        });
    });
  });

  it("Get on /story with the code param : and get a unique of story by code", done => {
    request(app)
      .get(`/story?code=tuto0`)
      .end((err, res) => {
        assert(res.status === 200);
        assert(res.body.title == "tuto0");
        done();
      });
  });

  it("Get on /pageContent : and get a unique page", done => {
    request(app)
      .get(`/pageContent?storyCode=tuto0&pageCode=page1`)
      .end((err, res) => {
        assert(res.status === 200);
        assert(res.body.code === "page1");
        done();
      });
  });

  it("POST to /story : create a story on DB", done => {
    Story.count().then(beforeCount => {
      request(app)
        .post("/story")
        .send({ title: "Tuto$ 3" })
        .end((err, res) => {
          assert(res.status === 200);
          Story.count().then(afterCount => {
            assert(afterCount === beforeCount + 1);
            Story.findOne({ title: "Tuto$ 3" }).then(story => {
              //Test la génération du code à partir du titre
              assert(story.code === "tuto3");
              done();
            });
          });
        });
    });
  });

  it("PUT to /story/:storyId/page : add a page to story on DB", done => {
    Story.findOne({ code: "tuto0" }).then(tuto0 => {
      request(app)
        .put(`/story/${tuto0._id}/page`)
        .send({ title: "page$ 23" })
        .end((err, res) => {
          assert(res.status === 200);
          console.log(res.body);
          assert(res.body[0].pages.length === 3);

          Story.findOne({ "pages.code": "page23" }, { "pages.$": 1 }).then(
            page23 => {
              assert(page23.pages[0].code === "page23");
              done();
            }
          );
        });
    });
  });

  it("PUT to /story/:storyId/page/:pageId/content : update content of  page on DB", done => {
    Story.findOne({ code: "tuto0" }).then(tuto0 => {
      request(app)
        .post(`/story/${tuto0._id}/page/${tuto0.pages[0]._id}/content`)
        .send({ content: "updated content" })
        .end((err, res) => {
          assert(res.status === 200);
          assert(res.body.pages[0].content === "updated content");
          done();
        });
    });
  });
});
