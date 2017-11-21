const mongoose = require("mongoose");

const Story = require("../models/story");

before(done => {
  process.env.NODE_ENV = "test";
  mongoose.connect("mongodb://localhost/zendichron_test", {
    useMongoClient: true
  });
  mongoose.connection.once("open", () => done()).on("error", err => {
    console.warn("Warning", err);
  });
});

beforeEach(done => {
  const { stories } = mongoose.connection.collections;
  stories
    .drop()
    .then(() => {
      const tuto0 = new Story({
        title: "tuto0",
        code: "tuto0",
        isOfficial: true,
        pages: [
          { title: "Page 1", code: "page1" },
          { title: "Page 2", code: "page2" }
        ]
      });
      const perso0 = new Story({ title: "perso0", code: "perso0" });

      return Promise.all([tuto0.save(), perso0.save()]);
    })
    .then(() => done())
    .catch(() => done());
});
