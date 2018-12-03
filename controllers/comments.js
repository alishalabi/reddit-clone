const Comment = require("../models/comment");
const Post = require("../models/post")

module.exports = (app) => {

  // HTTP Protocol: Create
  app.post("/posts/:postId/comments", (req, res) => {
    const currentUser = req.user
    if (req.user) {
      const comment = new Comment (req.body);
      comment.author = req.user._id

      comment
        .save()
        .then(comment => {
          Post.findById(req.user._id);
        })
        .then(post => {
          post.comments.unshift(comment)
          post.save();
          res.redirect("/posts/" + post._id);
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      return res.status(401);
    }
  })
}
