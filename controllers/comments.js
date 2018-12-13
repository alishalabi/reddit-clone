const Comment = require("../models/comment");
const Post = require("../models/post")
const User = require("../models/user")

module.exports = (app) => {

  app.post("/posts/:postId/comments", (req, res) => {
    const currentUser = req.user
    if (req.user) {
      // // Pre-Refactor
      // const comment = new Comment (req.body);
      // comment.author = req.user._id
      //
      // comment
      //   .save()
      //   .then(comment => {
      //     return Post.findById(req.params.postId);
      //   })
      //   .then(post => {
      //     post.comments.unshift(comment)
      //     post.save();
      //     res.redirect("/posts/" + post._id);

      // Post-Refactor
      Post.findById(req.params.postId)
        .exec(function(err, post) {
          const comment = new Comment(req.body)
          // Should create new comment collection
          comment.save().then((newComment) => {
            post.comments.unshift(newComment._id)
            post.save().then(() => {
              res.redirect(`/posts/` + post._id) 
            }).catch((err) => {
              console.error(err)
            })
          }).catch((err) => {
            console.error(err)
          })
        })
    } else {
      res.status(401);
    }
  })
}
