const Post = require("../models/post");

module.exports = (app) => {
  app.get("/n/:subreddit", (req, res) => {
    Post.find({subreddit: req.params.subreddit})
      .then((posts) => {
        res.render("posts-index.handlebars", {posts})
      })
      .catch(err => {
        console.log(err.data)
      })
  })
}
