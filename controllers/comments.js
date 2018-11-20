const Comment = require("../models/comment");
const Post = require("../models/post")

module.exports = (app) => {

  // HTTP Protocol: Create
  app.post("/posts/:postId/comments", (req, res) => {
    const comment = new Comment (req.body);
    comment
      .save()
      .then(comment => {
        return Post.findById(req.params.postId);
      })
      .then(post => {
        post.comments.unshift(comment);
        return post.save();
      })
      .then(post => {
        res.redirect("/");
      })
      .catch(err => {
        console.log(err)
      })
  })
}
