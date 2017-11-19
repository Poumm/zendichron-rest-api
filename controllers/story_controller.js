const mongoose = require("mongoose");

const Story = require("../models/story");

module.exports = {
  find(req, res, next) {
    const param = req.query;
    Story.find(param)
      .then(stories => {
        res.send(stories);
      })
      .catch(next);
  }
};
