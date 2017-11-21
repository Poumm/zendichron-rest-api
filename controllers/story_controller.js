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
  },

  findPageByStoryAndCode(req, res, next) {
    const { storyCode, pageCode } = req.params;
    Story.findOne({ code: storyCode, "pages.code": pageCode })
      .then(story => {
        res.send(story.pages[0]);
      })
      .catch(next);
  },

  create(req, res, next) {
    const props = req.body;
    props.code = props.title.replace(/[^\w]/gi, "").toLowerCase();
    Story.create(props)
      .then(story => {
        res.send(story);
      })
      .catch(next);
  },

  addPage(req, res, next) {
    const props = req.body;
    props.code = props.title.replace(/[^\w]/gi, "").toLowerCase();
    const { code } = req.params;
    Story.findOne({ code })
      .then(story => {
        story.pages.push({ title: "page$ 1", code: "page1" });
        return story.save();
      })
      .then(() => Story.find({ code }))
      .then(updated => res.send(updated))
      .catch(next);
  }
};
