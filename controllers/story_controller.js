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
  },

  findById(req, res, next) {
    const _id = req.params.id;
    Story.find({ _id })
      .then(stories => {
        res.send(stories);
      })
      .catch(next);
  }
};
