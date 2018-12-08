const chai = require("chai")
const chaiHttp = require("chai-http")
const Post = require("../models/post")
const should = chai.should()

describe("Posts", () => {
  it("should create with valid attributes at POST /posts", done => {
    Post.findOneAndRemove(post, function() {
      Post.find(function(err, posts) {
        const postCount = posts.count
        const post = { title: "post title", url: "https://www.google.com", summary: "post summary" };

        chai
          .request("localhost:8000")
          .post("/posts/new")
          .send(post)
          .then(res => {
            Post.find(function(err, posts) {
              postCount.should.be.equal(posts.length - 1)
              res.should.have.status(200)
              return done()
            })
          })
          .catch(err => {
            return done(err);
          })
      })
    })

  })

})
