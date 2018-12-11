const Post = require("../models/post")
const Comment = require("../models/comment")
const User = require("../models/user")

module.exports = app => {

  // HTTP: New Reply
  app.get("/posts/:postId/comments/:commentId/replies/new", (req, res) => {
    let post;
    Post.findById(req.params.postId)
      .then(p => {
        post = p
        return Comment.findById(req.params.commentId)
      })
      .then(comment => {
        res.render("replies-new", { post, comment })
      })
      .catch(err => {
        console.log(err.message)
      })

  // HTTP: Create Reply
  app.post("/posts/:postId/comments/:commentId/replies", (req, res) =>{
    Post.findById(req.params.postId)
      .then(post => {
        var comment = post.comments.id(req.params.commentId)
        comment.comments.unshift(req.body)
        return post.save()
      })
      .then(post => {
        res.redirect("/posts/" + post._id)
      })
      .catch(err => {
        console.log(err.message)
      })
  })



}
