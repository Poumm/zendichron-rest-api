const mongoose = require("mongoose");

const Story = require("../models/story");

function createCodeFromTitle(title) {
  return title.replace(/[^\w]/gi, "").toLowerCase();
}

module.exports = {
  find(req, res, next) {
    const param = req.query;
    Story.find(param)
      .then(stories => {
        stories = stories.map(story => {
          const { _id, title, code, isOfficial, summary } = story;
          return { _id, title, code, isOfficial, summary };
        });
        res.send(stories);
      })
      .catch(next);
  },

  findById(req, res, next) {
    const _id = req.params.id;
    Story.findOne({ _id })
      .then(story => {
        res.send(story);
      })
      .catch(next);
  },

  findByParams(req, res, next) {
    const { code } = req.query;
    Story.findOne({ code })
      .then(story => {
        res.send(story);
      })
      .catch(next);
  },

  findPageByStoryAndCode(req, res, next) {
    const { storyCode, pageCode } = req.params;
    Story.findOne({ code: storyCode, "pages.code": pageCode }, { "pages.$": 1 })
      .then(story => {
        res.send(story.pages[0]);
      })
      .catch(next);
  },

  create(req, res, next) {
    const props = req.body;
    props.code = createCodeFromTitle(props.title);
    Story.create(props)
      .then(story => {
        res.send(story);
      })
      .catch(next);
  },

  addPage(req, res, next) {
    const { storyId } = req.params;
    const { title } = req.body;
    const code = createCodeFromTitle(title);
    Story.findOne({ _id: storyId })
      .then(story => {
        story.pages.push({ title, code });
        return story.save();
      })
      .then(() => res.send({ code }))
      .catch(next);
  },

  editPage(req, res, next) {
    const props = req.body;
    props.code = createCodeFromTitle(props.title);
    const { code } = req.params;
    Story.findOne({ code })
      .then(story => {
        story.pages.push(props);
        return story.save();
      })
      .then(() => Story.find({ code }))
      .then(updated => res.send(updated))
      .catch(next);
  }
};
