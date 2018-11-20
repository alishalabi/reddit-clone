const Post = require("../models/post")

module.exports = app => {


  // HTTP Protocol: Index
  app.get("/", (req, res) => {
    Post.find({})
      .then(posts => {
        res.render("posts-index", { posts })
      })
      .catch(err => {
        console.log(err.message);
      })
  })


  // HTTP Protocol: New
  app.get("/posts/new", (req, res) => {
    console.log('Rendering forms')
    res.render("posts-new", {})
  })

  // HTTP Protocol: Create
  app.post("/posts", (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

  // HTTP Protocol: Show One
  app.get("/posts/:id", (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        res.render("posts-show", { post })
      })
      .catch(err => {
        console.log(err.message);
      })
  })

}
