const mongoose = require("mongoose");

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
      console.log("dropped");
      done();
    })
    .catch(() => done());
});
