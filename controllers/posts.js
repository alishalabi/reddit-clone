const Post = require("../models/post")
const Comment = require("../models/comment")
const User = require("../models/user")

module.exports = app => {


  // app.get("/posts", (req, res) => {
  //   Post.find({})
  //     .then(posts => {
  //       res.render("posts-index", { posts })
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     })
  // })

  // HTTP Protocol: Index
  app.get("/", (req, res) => {
    var currentUser = req.user;
    Post.find({})
      .populate("author")
      .then(posts => {
        res.render("posts-index", { posts, currentUser })
      })
      .catch(err => {
        console.log(err.message);
      })
  })


  // HTTP Protocol: New
  app.get("/posts/new", (req, res) => {
    var currentUser = req.user
    console.log('Rendering forms')
    res.render("posts-new", { currentUser })
  })

  // HTTP Protocol: Create
  app.post("/posts", (req, res) => {
    var currentUser = req.user
    // Only logged in user can create new posts
    if (req.user) {
      // INSTANTIATE INSTANCE OF POST MODEL
      const post = new Post(req.body);
      post.author = req.user._id;

      // SAVE INSTANCE OF POST MODEL TO DB
      post
        .save()
        .then(post => {
        // REDIRECT TO THE ROOT
          return User.findById(req.user._id);
      })
      .then(user => {
        user.posts.unshift(post);
        user.save()
        res.redirect("/posts/" + post._id)
      })
      .catch(err => {
        console.log(err.message)
      })
    } else {
      return res.status(401);
    }
  });

  // HTTP Protocol: Show One
  app.get("/posts/:id", (req, res) => {
    var currentUser = req.user
    Post.findById(req.params.id)
      // .populate("comments")
        .then(post => {
          res.render("posts-show", { post, currentUser })
      })
      .catch(err => {
        console.log(err.message);
      })
  })

  // HTTP Protocol: AJAX for Vote Up
  app.put("/posts/:id/vote-up", function(req, res) {
    Post.findById(req.params.id).exec(function(err, post) {
      post.upVotes.push(req.user._id);
      post.voteScore = post.voteTotal + 1;
      post.save();

      res.status(200);
    });
  });

  // HTTP Protocol: AJAX for Vote Down
  app.put("/posts/:id/vote-down", function(req, res) {
    Post.findById(req.params.id).exec(function(err, post) {
      post.downVotes.push(req.user._id);
      post.voteScore = post.voteTotal - 1;
      post.save();

      res.status(200);
    });
  });

}
