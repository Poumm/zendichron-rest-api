const StoryController = require("../controllers/story_controller");

module.exports = app => {
  app.get("/stories", StoryController.find);
  app.get("/story/:id", StoryController.findById);
  app.get("/story", StoryController.findByParams);

  app.get("/pageContent", StoryController.findPageByStoryAndCode);
  app.post("/story", StoryController.create);
  app.post("/Story/:storyId/page", StoryController.addPage);
  app.put("/story/:code/page", StoryController.editPage);
};
