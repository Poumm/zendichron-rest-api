const StoryController = require("../controllers/story_controller");

module.exports = app => {
  app.get("/stories", StoryController.find);

  app.get("/story/:id", StoryController.findById);

  app.get(
    "/story/:storyCode/page/:pageCode",
    StoryController.findPageByStoryAndCode
  );
};
