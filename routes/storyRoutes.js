const StoryController = require("../controllers/story_controller");

module.exports = app => {
  app.get("/stories", StoryController.find);

  app.get("/stories/:id", StoryController.findById);
};
