const Post = require("../models/post")
const Comment = require("../models/comment")
const User = require("../models/user")

module.exports = app => {

  // HTTP: New Reply


  // /posts/{{@root.post.id}}/comments/{{this._id}}/replies/new
  app.get("/posts/:postId/comments/:commentId/replies/new", (req, res) => {
    let post;
    Post.findById(req.params.postId)
      .then(p => {
        post = p
        return Comment.findById(req.params.commentId)
      })
      .then(comment => {
        console.log(comment)
        res.render("replies-new", { post, comment })
      })
      .catch(err => {
        console.log(err.message)
      })
  //
  //
  //     app.post('/posts/:postId/comments/:commentId/replies', (req, res) => {
  //         var currentUser = req.user
  //           if (currentUser === null) {
  //
  //
  //             return res.redirect('/login');
  //           }
  //         // INSTANTIATE INSTANCE OF EMBER MODEL
  //         const comment = new Comment(req.body);
  //         comment.author = req.user._id;
  //         comment.postId = req.params.postId
  //         comment
  //             .save()
  //             // Find Parent Comment
  //             .then(() => {
  //                 return Comment.findById(req.params.commentId)
  //             })
  //             .then((parent) => {
  //                 parent.comments.unshift(comment)
  //                 parent.save()
  //             })
  //             // Find the Pyromancer author
  //             .then(() => {
  //                 return User.findById(req.user._id);
  //             })
  //             // Save the author's posts
  //             .then((user) => {
  //                 user.comments.unshift(comment);
  //                 user.save();
  //             })
  //             // Redirect to original Post
  //             .then(() => {
  //                 res.redirect('/posts/' + req.params.postId);
  //             })
  //             .catch((err) => {
  //                 console.log(err.message);
  //             });
  //     });









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
